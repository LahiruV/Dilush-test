import { ReactNode, CSSProperties } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import './container-header.css';

export interface ContainerHeaderProps {
    icon: fa2.IconDefinition;
    name: string;
    children?: ReactNode;
    style?: CSSProperties;
}

export function ContainerHeader(props: ContainerHeaderProps) {
    return (
        <div className="container-header" style={props.style}>
            <div>
                <span className="center-align">
                    <FontAwesomeIcon className="container-header-icon" icon={props.icon} size='1x' />
                    {props.name}
                </span>
            </div>
            {props.children}
        </div>
    );
}

export default ContainerHeader;
