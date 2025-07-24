import { ReactNode, CSSProperties } from 'react'
import './filter-form-group.css';

interface FilterFormGroupProps {
  label?: string;
  children?: ReactNode;
  hasColumns?: boolean;
  isBlockColumns?: boolean;
  columnWrapperStyle?: CSSProperties;
  isRequired?: boolean;
  extraGap?: boolean;
  isShortLabel?: boolean;
}

export const FilterFormGroup = (props: FilterFormGroupProps) => {
  return (
    <div className={`filter-form-group ${props.extraGap ? 'extra-gap' : ''}`}>
      {props.label && (
        <div className={`filter-header ${props.isShortLabel ? 'short-label' : ''}`}>
          {props.label}{props.isRequired && <span className="filter-required-indicator">*</span>}
        </div>
      )}

      {props.hasColumns ? <div className='filter-form-group-inner' style={props.isBlockColumns ? { flexDirection: 'column', alignItems: 'flex-start', marginLeft: '15px', ...props.columnWrapperStyle } : { ...props.columnWrapperStyle }}>{props.children}</div> : props.children}
    </div>
  )
}