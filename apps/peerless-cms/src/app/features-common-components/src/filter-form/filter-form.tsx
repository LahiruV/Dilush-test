import { FormEvent, ReactNode, forwardRef, useImperativeHandle, useRef } from 'react';
import './filter-form.css';

interface FilterFormProps {
  id?: string;
  className?: string;
  onSubmit: () => void;
  children: ReactNode;
}

export interface FormComponentHandles {
  triggerSubmit: () => void;
}

export const FilterForm = forwardRef<FormComponentHandles, FilterFormProps>((props, ref) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  useImperativeHandle(
    ref,
    () => ({
      triggerSubmit: () => {
        if (formRef.current) {
          formRef.current.requestSubmit();
        }
      },
    }),
    []
  );

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onSubmit();
  }

  return (
    <form id={props.id} className={`filter-form ${props.className}`} ref={formRef} onSubmit={submitHandler}>
      {props.children}
    </form>
  )
})
