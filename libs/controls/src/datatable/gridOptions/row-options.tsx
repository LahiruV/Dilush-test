import { useRef, useEffect } from 'react';
import { Menu } from 'primereact/menu';
import { Button } from 'primereact/button';
import './grid-options.css';

export const rowOptions = (options: any, rowData: any, icon?: any, passAllData: boolean = false, onBtnClick: any = null) => {
  const menu = useRef<Menu>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const menuOptions = options.map((option: any) => ({
    ...option,
    command: () => (passAllData ? option.command(option, rowData) : option.command(option.type, rowData))
  }));

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        menu.current?.hide?.(event as any);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={containerRef} className='grid-option-menu'>
      <Menu model={menuOptions} popup ref={menu} className='grid-option-menu-list' />
      <Button
        label=""
        icon={icon ? icon : 'pi pi-ellipsis-v'}
        onClick={(e) => {
          menu.current?.toggle(e);
          onBtnClick && onBtnClick(rowData);
        }}
        className='grid-option-button p-button-outlined border-none'
      />
    </div>
  );
};
