import {useEffect, useMemo, useRef} from 'react'
import { FormComponentHandles } from '@peerless-cms/features-common-components';

interface HookProps {
  isFormSubmit: boolean;
  setTriggerSubmit: (value: boolean) => void;
  isClearFilters?: boolean;
  clearFilters?: () => void;
  noSubmit?: boolean;
  filters?: any[];
  setIsActiveFilters?: (value: boolean) => void;
}

/**
 * Handles form submission and filter clearing logic for filter forms.
 * @param {HookProps} props - `HookProps` properties
 * @param {boolean} props.isFormSubmit - Indicates if the form is submitted
 * @param {Function} props.setTriggerSubmit - Function to set the trigger submit state
 * @param {boolean=} props.isClearFilters - Indicates if the filters should be cleared
 * @param {Function=} props.clearFilters - Function to clear the filters
 * @param {boolean=} props.noSubmit - Indicates if the form should be automatically submitted, whithout user interaction
 * @param {Array=} props.filters - Array of filters to check for active filters
 * @param {Function=} props.setIsActiveFilters - Function to set the active filters state
 * @returns {RefObject} The Ref for form component
 * 
 * @example
 *   const { formComponentRef } = useFilterForm({
 *     isFormSubmit,
 *     setTriggerSubmit: (value) => dispatch(setTriggerEndUserSalesFormSubmit(value)),
 *     isClearFilters: props.isClearFilters,
 *     clearFilters,
 *     noSubmit: false,
 *     filters: [filter1, filter2, filter3],
 *     setIsActiveFilters: props.setIsActiveFilters
 *   });
 */

export const useFilterForm = ({isFormSubmit, setTriggerSubmit, isClearFilters, clearFilters, noSubmit, filters=[], setIsActiveFilters}: HookProps) => {
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

  const isActiveFilters = useMemo(() => {
    return filters.some(filter => filter?.value !== "" && filter !== '' && filter !== null && filter !== false);
  }, [filters]);

  useEffect(() => {
    if (setIsActiveFilters) {
      setIsActiveFilters(isActiveFilters);
    }
  }, [isActiveFilters]);

  return { formComponentRef }
}
