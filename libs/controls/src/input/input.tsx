import React, { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Error } from '@progress/kendo-react-labels';
import '../controls.css';
import { Button, Form } from 'react-bootstrap';
import { useReadOnlyContext } from '@peerless/providers';
import { NONAME } from 'dns';

export interface ComboBoxProps {
  label: string;
  value: string;
}

export interface InputProps {
  label: string;
  name: string;
  type?: string;
  required?: string | boolean;
  load?: string;
  comboBoxOptions?: Array<ComboBoxProps>;
  onChangeCallBack?: any;
  isDisabled?: boolean;
  value?: string;
  min?: number;
  max?: number;
  step?: number; // Add step for decimal support
  decimalPlaces?: number; // Custom prop to control decimal places
}

interface FormFieldProps {
  label: string;
  children: React.ReactNode;
  name: string;
  type?: string;
  required?: string | boolean;
}
export const FormField: React.FC<FormFieldProps> = ({ children, label, name, type, required }) => {
  const {
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    (type != 'checkBox') && (type != 'radio') ?
      <div className='form-field'>
        <label> {label} {required && required === true ? <span className='required-indicator'>*</span> : <></>}</label>
        {children}
        {error && <Error>{error?.message as string}</Error>}
      </div>
      :
      <div className='form-check-box'>
        {children}
        {error && <Error>{error?.message as string}</Error>}
      </div>
  );
};

export const FormInput = memo((props: Readonly<InputProps>) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const { readOnly } = useReadOnlyContext();

  const error = errors[props.name];

  // Detect decimal type
  const isDecimal = props.type === 'decimal';

  return (
    <FormField {...props}>
      {props.type === 'select' ? (
        <Form.Control
          as="select"
          disabled={readOnly || (props.isDisabled ?? false)}
          {...register(props.name, { required: props.required })}
          className={error ? 'error' : ''}
          onChange={(e) => { props.onChangeCallBack && props.onChangeCallBack(e) }}
        >
          {props.comboBoxOptions && props.comboBoxOptions.map((option: ComboBoxProps, index: number) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Control>
      ) : props.type === 'textarea' ? (
        <Form.Control
          as="textarea"
          disabled={readOnly || (props.isDisabled ?? false)}
          {...register(props.name, { required: props.required })}
          className={error ? 'error' : ''}
        />
      ) : props.type === 'checkBox' ? (
        <Form.Check
          type="checkbox"
          label={props.label}
          disabled={readOnly || (props.isDisabled ?? false)}
          {...register(props.name, {
            required: props.required,
            onChange: (e) => {
              if (props.onChangeCallBack) {
                props.onChangeCallBack(e);
              }
            }
          })}
          className={error ? 'error' : ''}
        />
      ) : props.type === 'radio' ? (
        <Form.Check
          type="radio"
          label={props.label}
          value={props.value}
          disabled={readOnly || (props.isDisabled ?? false)}
          {...register(props.name, {
            required: props.required,
            onChange: (e) => {
              if (props.onChangeCallBack) {
                props.onChangeCallBack(e);
              }
            }
          })}
          className={error ? 'error' : ''}
        />
      ) : props.type === 'numberWithOutString' ? (
        <Form.Control
          disabled={readOnly || (props.isDisabled ?? false)}
          type="text"
          inputMode={props.decimalPlaces !== undefined ? 'decimal' : 'numeric'}
          min={props.min}
          max={props.max}
          {...register(props.name, { required: props.required })}
          className={error ? 'error' : ''}
          onKeyDown={e => {
            // Allow: backspace, delete, tab, escape, enter, arrows, home/end
            if (
              [
                'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                'ArrowLeft', 'ArrowRight', 'Home', 'End'
              ].includes(e.key)
            ) {
              return;
            }

            // If you want to allow negative, include this block:
            if (e.key === '-') {
              // Only allow minus at the start, and only one
              if (e.currentTarget.selectionStart !== 0 || e.currentTarget.value.includes('-')) {
                e.preventDefault();
              }
              return;
            }

            // Allow one decimal point, if allowed
            if (e.key === '.') {
              if (
                (props.decimalPlaces ?? 0) === 0 ||
                e.currentTarget.value.includes('.') ||
                e.currentTarget.selectionStart === 0 // Prevent starting with dot
              ) {
                e.preventDefault();
              }
              return;
            }

            // Block all non-numeric
            if (!/\d/.test(e.key)) {
              e.preventDefault();
            }
          }}
          onChange={e => {
            let value = e.target.value;

            // Truncate decimal places if needed
            if (value && props.decimalPlaces !== undefined) {
              const parts = value.split('.');
              if (parts[1] && parts[1].length > props.decimalPlaces) {
                value = parts[0] + '.' + parts[1].slice(0, props.decimalPlaces);
                e.target.value = value;
              }
            }

            // Optionally clamp min/max (if you want to auto-correct):
            if (value !== '') {
              const numValue = Number(value);
              if (props.min !== undefined && numValue < props.min) value = String(props.min);
              if (props.max !== undefined && numValue > props.max) value = String(props.max);
              e.target.value = value;
            }

            if (props.onChangeCallBack) {
              props.onChangeCallBack(e);
            }
          }}
        />
      ) : isDecimal ? (
        <Form.Control
          type="text"
          inputMode="decimal"
          disabled={readOnly || (props.isDisabled ?? false)}
          min={props.min}
          max={props.max}
          {...register(props.name, {
            required: props.required,
            validate: value => {
              if (value !== '' && value != null) {
                const decPlaces = props.decimalPlaces ?? 2;
                const regex = new RegExp(`^-?\\d*(\\.\\d{0,${decPlaces}})?$`);
                if (!regex.test(value)) {
                  return `Up to ${decPlaces} decimal places allowed`;
                }
                if (props.min !== undefined && parseFloat(value) < props.min) {
                  return `Minimum is ${props.min}`;
                }
                if (props.max !== undefined && parseFloat(value) > props.max) {
                  return `Maximum is ${props.max}`;
                }
              }
              return true;
            }
          })}
          className={error ? 'error' : ''}
          onChange={e => {
            let value = e.target.value;
            // If decimalPlaces is defined, truncate after allowed digits
            const decPlaces = props.decimalPlaces ?? 2;
            const match = value.match(new RegExp(`^-?\\d*(\\.\\d{0,${decPlaces}})?`));
            if (match) {
              value = match[0]; // keep only allowed decimal format
              e.target.value = value;
            }
            // Enforce min/max if value is not empty
            if (value !== '') {
              const numValue = Number(value);
              if (props.min !== undefined && numValue < props.min) {
                value = String(props.min);
                e.target.value = value;
              }
              if (props.max !== undefined && numValue > props.max) {
                value = String(props.max);
                e.target.value = value;
              }
            }
            if (props.onChangeCallBack) props.onChangeCallBack(e);
          }}
          onKeyDown={e => {
            // Allow: backspace, delete, tab, escape, enter, arrows, home/end, period, minus
            if (
              [
                'Backspace', 'Delete', 'Tab', 'Escape', 'Enter',
                'ArrowLeft', 'ArrowRight', 'Home', 'End'
              ].includes(e.key)
            ) {
              return;
            }

            const decPlaces = props.decimalPlaces ?? 2;
            // Allow only one dot (.) and only one minus (-) at the start
            if (e.key === '.') {
              if (
                decPlaces === 0 ||
                e.currentTarget.value.includes('.') ||
                e.currentTarget.selectionStart === 0 // Prevent dot at start
              ) {
                e.preventDefault();
              }
              return;
            }
            if (e.key === '-') {
              if (
                e.currentTarget.selectionStart !== 0 ||
                e.currentTarget.value.includes('-')
              ) {
                e.preventDefault();
              }
              return;
            }

            // Prevent any non-digit input
            if (!/\d/.test(e.key)) {
              e.preventDefault();
            }
          }}
          pattern={`^-?\\d*(\\.\\d{0,${props.decimalPlaces ?? 2}})?$`}
          autoComplete="off"
        />
      ) : (
        <Form.Control
          disabled={readOnly || (props.isDisabled ?? false)}
          type={props.type ? props.type : 'text'}
          min={props.type === 'number' ? props.min : undefined}
          max={props.type === 'number' ? props.max : undefined}
          {...register(props.name, { required: props.required })}
          className={error ? 'error' : ''}
          onChange={(e) => {
            let value = e.target.value;
            if (props.type === 'number') {
              const min = props.min !== undefined ? Number(props.min) : -Infinity;
              const max = props.max !== undefined ? Number(props.max) : Infinity;
              if (value !== '') {
                const numValue = Number(value);
                if (numValue < min) value = String(min);
                if (numValue > max) value = String(max);
              }
            }
            e.target.value = value;
            if (props.onChangeCallBack) {
              props.onChangeCallBack(e);
            }
          }}
        />
      )}
    </FormField>
  );
});

export const FormButton = memo((props: Readonly<InputProps>) => {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const { readOnly } = useReadOnlyContext();

  if (readOnly) {
    return null;
  }

  return (
    <Button disabled={isSubmitting} type='submit' variant='success'>
      {isSubmitting ? props.load : props.label}
    </Button>
  );
});
