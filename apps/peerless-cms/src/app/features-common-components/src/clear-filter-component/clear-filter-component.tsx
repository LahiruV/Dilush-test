import { CSSProperties } from 'react';
import './clear-filter-component.css';

export interface ClearFilterBoxProps {
  onClick: () => void;
  styles?: CSSProperties;
}

export function ClearFilterBox({ onClick, styles }: ClearFilterBoxProps) {
  return (
    <div style={{ display: 'flex', ...styles }}>
      <span className="filter-title-styles">FILTERS</span>
      <button
        className="clear-filter-title-styles"
        type="button"
        style={{ marginLeft: 'auto', marginRight: '0px', cursor: 'pointer' }}
        onClick={onClick}
      >
        Clear Filters
      </button>
    </div>
  );
}

export default ClearFilterBox;
