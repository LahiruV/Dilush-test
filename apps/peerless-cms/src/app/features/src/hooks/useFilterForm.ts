import {useEffect, useRef} from 'react'
import { FormComponentHandles } from '@peerless-cms/features-common-components';

interface HookProps {
  isFormSubmit: boolean;
  setTriggerSubmit: (value: boolean) => void;
  isClearFilters?: boolean;
  clearFilters?: () => void;
  noSubmit?: boolean;
}

/**
 * Handles form submission and filter clearing logic for filter forms.
 * @param {HookProps} props - `HookProps` properties
 * @param {boolean} props.isFormSubmit - Indicates if the form is submitted
 * @param {Function} props.setTriggerSubmit - Function to set the trigger submit state
 * @param {boolean} props.isClearFilters - Indicates if the filters should be cleared
 * @param {Function} props.clearFilters - Function to clear the filters
 * @param {boolean} props.noSubmit - Indicates if the form should be automatically submitted, whithout user interaction
 * @returns {RefObject} The Ref for form component
 * 
 * @example
 *   const { formComponentRef } = useFilterForm({
 *     isFormSubmit,
 *     setTriggerSubmit: (value) => dispatch(setTriggerEndUserSalesFormSubmit(value)),
 *     isClearFilters: props.isClearFilters,
 *     clearFilters,
 *     noSubmit: false
 *   });
 */

export const useFilterForm = ({isFormSubmit,setTriggerSubmit, isClearFilters,clearFilters,noSubmit}: HookProps) => {
  const formComponentRef = useRef<FormComponentHandles>(null);
  
  useEffect(() => {
          if (formComponentRef.current && (isFormSubmit || noSubmit)) {
              formComponentRef.current.triggerSubmit();

              setTriggerSubmit(false);
          }
      }, [isFormSubmit])

      useEffect(() => {
        if (isClearFilters) {
            clearFilters?.();
        }
  }, [isClearFilters]);

  return { formComponentRef }
}
