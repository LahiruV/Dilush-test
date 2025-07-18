import * as React from 'react';
import { FormElement, Field } from '@progress/kendo-react-form';
import { Label, Error } from '@progress/kendo-react-labels';
import { Checkbox, Input, TextArea } from '@progress/kendo-react-inputs';
import { DateTimePicker } from '@progress/kendo-react-dateinputs';
import { SchedulerFormEditorProps } from '@progress/kendo-react-scheduler';
import { SchedulerForm, SchedulerFormProps } from '@progress/kendo-react-scheduler';
import { Dialog, DialogProps } from '@progress/kendo-react-dialogs';

export const CustomDialog = (leadStage: string) => {
    return (props: DialogProps) => {
        return <Dialog {...props} title={`${leadStage || 'Other'} Appointment`} />;
    }
};

/**
 * CustomFormEditor is a higher-order component that returns a form editor component for scheduling activities.
 * 
 * @param {number} activityID - The ID of the activity. If the activityID is not 0, additional fields for follow-up will be displayed.
 * 
 * @returns {Function} A functional component that renders a form with fields for Subject, Start, End, Description, and optionally Follow Up.
 * 
 * The form includes the following fields:
 * - **Subject**: A text input field for the subject of the activity.
 * - **Start**: A DateTimePicker input for the start date and time of the activity.
 * - **End**: A DateTimePicker input for the end date and time of the activity.
 * - **Description**: A text area for the description of the activity.
 * - **Follow Up**: (Optional) If the activityID is not 0, a checkbox and DateTimePicker input for follow-up details.
 * 
 * Each field is wrapped in a `k-form-field` div for styling purposes, and error messages are displayed if there are validation errors.
 * 
 * @param {SchedulerFormEditorProps} props - The properties passed to the form editor component, including validation errors.
 * 
 * @example
 * ```tsx
 * const MyFormEditor = CustomFormEditor(1);
 * 
 * return (
 *   <MyFormEditor
 *     errors={{ Subject: 'Subject is required', Start: '', End: '', FollowUp: '' }}
 *   />
 * );
 * ```
 */
export const CustomFormEditor = (activityID: number) => {
    return (props: SchedulerFormEditorProps) => {
        const allDay = props.valueGetter ? props.valueGetter('AllDayChecked') : false;

        return (
            <FormElement horizontal={true}>
                <div className="k-form-field">
                    <Label>
                        Subject
                    </Label>
                    <div className="k-form-field-wrap">
                        <Field
                            id={'Subject'}
                            name={'Subject'}
                            component={Input}
                        />
                        {props.errors.Subject && <Error>{props.errors.Subject}</Error>}
                    </div>
                </div>
                <div className="k-form-field">
                    <Label>
                        All Day
                    </Label>
                    <div className="k-form-field-wrap">
                        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }} >
                            <Field
                                id={'AllDayChecked'}
                                name={'AllDayChecked'}
                                component={Checkbox}
                                rows={1}
                            />
                        </div>
                    </div>
                </div>
                {!allDay ? (
                    <>
                        <div className="k-form-field">
                            <Label>
                                Start
                            </Label>
                            <div className="k-form-field-wrap">
                                <div style={{ width: '100%', display: 'flex', alignItems: 'center' }} >
                                    <Field
                                        id={'Start'}
                                        name={'Start'}
                                        component={DateTimePicker}
                                        rows={1}
                                        width={'180px'}
                                        format={'dd MMM yyyy  | HH:mm'}
                                    />
                                    {props.errors.Start && <Error>{props.errors.Start}</Error>}
                                </div>
                            </div>
                        </div>
                        <div className="k-form-field">
                            <Label>
                                End
                            </Label>
                            <Field
                                id={'End'}
                                name={'End'}
                                component={DateTimePicker}
                                rows={1}
                                width={'180px'}
                                format={'dd MMM yyyy  | HH:mm'}
                            />
                            {props.errors.End && <Error>{props.errors.End}</Error>}
                        </div>
                    </>
                ) :
                    (
                        <>
                            <div className="k-form-field">
                                <Label>
                                    Start
                                </Label>
                                <div className="k-form-field-wrap">
                                    <div style={{ width: '100%', display: 'flex', alignItems: 'center' }} >
                                        <Field
                                            id={'Start'}
                                            name={'Start'}
                                            component={DateTimePicker}
                                            rows={1}
                                            width={'180px'}
                                            format={'dd MMM yyyy'}
                                        />
                                        {props.errors.Start && <Error>{props.errors.Start}</Error>}
                                    </div>
                                </div>
                            </div>
                            <div className="k-form-field">
                                <Label>
                                    End
                                </Label>
                                <Field
                                    id={'End'}
                                    name={'End'}
                                    component={DateTimePicker}
                                    rows={1}
                                    width={'180px'}
                                    format={'dd MMM yyyy'}
                                />
                                {props.errors.End && <Error>{props.errors.End}</Error>}
                            </div>
                        </>
                    )}

                <div className="k-form-field">
                    <Label>
                        Description
                    </Label>
                    <div className="k-form-field-wrap">
                        <Field
                            id={'Description'}
                            name={'Description'}
                            component={TextArea}
                            rows={1}
                        />
                    </div>
                </div>
                {activityID !== 0 && (
                    <div className="k-form-field">
                        <Label>
                            Follow Up
                        </Label>
                        <div className="k-form-field-wrap">
                            <Field
                                id={'FollowUpChecked'}
                                name={'FollowUpChecked'}
                                component={Checkbox}
                                rows={1}
                            />
                        </div>
                        <div className="k-form-field-wrap">
                            <Field
                                id={'FollowUp'}
                                name={'FollowUp'}
                                component={DateTimePicker}
                                rows={1}
                                format={'dd MMM yyyy  | HH:mm'}
                            />
                            {props.errors.FollowUp && <Error>{props.errors.FollowUp}</Error>}
                        </div>
                    </div>
                )}
            </FormElement>
        );
    };
};

export const FormWithCustomEditor = (props: SchedulerFormProps) => {
    const requiredValidator = React.useCallback(
        (value: any) => (value === undefined || value === null || value === ''
            ? 'Field is required.'
            : undefined),
        []
    );

    const formValidator = (_dataItem: any, formValueGetter: any) => {
        let result: any = {};
        if (_dataItem.activityID !== undefined) {
            result.FollowUp = [
                requiredValidator(formValueGetter('FollowUp'))
            ].filter(Boolean).reduce((current, acc) => current || acc, '');
        }
        result.Subject = [
            requiredValidator(formValueGetter('Subject'))
        ].filter(Boolean).reduce((current, acc) => current || acc, '');

        result.Start = [
            requiredValidator(formValueGetter('Start'))
        ].filter(Boolean).reduce((current, acc) => current || acc, '');

        result.End = [
            requiredValidator(formValueGetter('End'))
        ].filter(Boolean).reduce((current, acc) => current || acc, '');

        return result;
    };

    return (
        <SchedulerForm
            {...props}
            editor={CustomFormEditor(props.dataItem.activityID || 0)}
            dialog={CustomDialog(props.dataItem.leadStage)}
            validator={formValidator}
        />
    );
};