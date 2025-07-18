import './info-box.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { ButtonWidget } from '@peerless/controls';

export interface InfoListItem {
  label: string;
  text: any;
}

/* eslint-disable-next-line */
export interface InfoBoxProps {
  title?: string; // Define the h5 prop
  titleBtn?: TitleButtonProps;
  header?: string;
  headerTag?: HeaderTagProps;
  contentText?: string;
  contentList?: InfoListItem[];
  cssClass?: string;
  labelWidthClass?: string;
  needBullets?: boolean;
  listClass?: string;
  headerSpannedValue?: string;
  headerClass?: string;
  valueClass?: string;
  listParentClass?: string;
}

export interface TitleButtonProps {
  displayText: string;
  callbackMethod: any;
}

export interface HeaderTagProps {
  icon: IconDefinition | null; // Allow null values for the icon property
  text: string;
  cssClass: string;
}

export function InfoBox({ title, titleBtn, header, headerTag, contentText, contentList, cssClass, labelWidthClass, needBullets, listClass, headerSpannedValue, headerClass, valueClass, listParentClass }: InfoBoxProps) {
  return (
    <div className={`info-box-container ${cssClass}`}>
      <div className='info-title'>
        {title && <span className='title-1'>{title}</span>}
        {titleBtn && <ButtonWidget id={titleBtn.displayText} classNames='clear-filter-title-styles' name={titleBtn.displayText} Function={titleBtn.callbackMethod} />}
      </div>

      {header && (
        <div className='info-header'>
          <span className={`title-2 ${headerClass}`}>{header}</span>
          {headerSpannedValue && (<span className='title-2-span'>{headerSpannedValue}</span>)}
          {headerTag && (<span className={headerTag.cssClass}>{headerTag?.icon && (<FontAwesomeIcon icon={headerTag.icon} />)}
            <span className='header-icon-txt'>{headerTag.text}</span></span>)}
        </div>)}

      {contentText && (
        <div className='info-text'>
          {contentText && (
            <span>
              {contentText.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  <br />
                </React.Fragment>
              ))}
            </span>
          )}
        </div>

      )}

      {contentList && (
        <div className='info-list'>
          <ul className={listParentClass} style={{ listStyleType: needBullets ? 'circle' : 'none' }}>
            {contentList && contentList.map((item, index) => (
              <li className={listClass + ' description-container'} key={index}>
                <label className={labelWidthClass + ' label'}>{item.label}</label>
                <span className={`value ${valueClass}`}>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default InfoBox;
