import './list-box.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface Item {
  icon: IconDefinition | null; 
  text: string;
  path: string | null;
}

interface ListBoxProps {
  items: Item[];
  title: string; 
  cssClass?: string
  onClick?: any;
}

export function ListBox({ items, title, cssClass, onClick }: ListBoxProps) {
  const handleClick = (item: Item) => {
    if (onClick) {
      onClick(item);  
    }
  };
  return (
    <div className={`filter-list-container ${cssClass}`}>
      <span className='box-title'>{title}</span>
      <ul className='filter-list'>
        {items.map((item, index) => (
          <li key={index} tabIndex={0} onClick={(e) => {e.preventDefault(); handleClick(item);}}>
            {item.icon && <FontAwesomeIcon icon={item.icon} className='list-item-icon' />}
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListBox;
