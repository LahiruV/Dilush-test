import { ReactNode, CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import './container-header.css';

export interface ContainerHeaderProps {
    icon: fa2.IconDefinition;
    name: string;
    children?: ReactNode;
    style?: CSSProperties;
    titleInlineBeforeElements?: ReactNode;
    titleInlineAfterElements?: ReactNode;
}

export const ContainerHeader = ({ icon, name, children, style, titleInlineBeforeElements, titleInlineAfterElements }: ContainerHeaderProps) => (
    <div className="container-header" style={style}>
        <div>
            <span className="center-align">
                {titleInlineBeforeElements}
                <FontAwesomeIcon className="container-header-icon" icon={icon} size='1x' />
                {name}
                {titleInlineAfterElements}
            </span>
        </div>
        {children}
    </div>
)

export default ContainerHeader;
