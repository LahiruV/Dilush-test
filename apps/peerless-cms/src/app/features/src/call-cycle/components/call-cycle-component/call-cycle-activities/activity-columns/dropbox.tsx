import * as React from 'react';
import { useDroppable } from '@progress/kendo-react-common';

interface DroppableBoxProps {
    children?: React.ReactNode;
    selected: boolean;
    id: string;
    onDrop: (id: string) => void;
    indexDrop: number;
}

export const DroppableBox = (props: DroppableBoxProps) => {
    const element = React.useRef<HTMLDivElement>(null);
    const [isInside, setIsInside] = React.useState(false);

    const handleDragEnter = React.useCallback(() => {
        setIsInside(true);
    }, []);

    const handleDragLeave = React.useCallback((e: any) => {
        // debugger;
        setIsInside(false);
    }, []);

    const handleDrop = React.useCallback(() => {
        props.onDrop(props.id);
    }, [props.onDrop, props.id]);

    useDroppable(element, {
        onDragEnter: handleDragEnter,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop
    });

    return (
        <div>
            <div
                ref={element}
                style={{
                    paddingLeft: 10,
                    paddingBottom: 10,
                    position: 'relative',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '290px',
                    height: '100%',
                    borderWidth: '1px',
                    borderStyle: 'solid',
                    borderRadius: '5px',
                    borderColor: !props.selected && isInside ? 'orange' : 'lightgray',
                    transition: 'border-color .2s ease-in-out'
                }}
            >
                <div
                    style={{
                        marginLeft: -10,
                        backgroundColor: !props.selected && isInside ? 'orange' : '#00693E',
                        padding: '5px 5px 5px 5px',
                        fontSize: '14px',
                        fontWeight: 'lighter',
                        color: 'white',
                        border: '1px',
                        borderRadius: '1px',
                    }}
                >
                    <span style={{ userSelect: 'none' }}>{props.id}</span>
                </div>
                {props.children || 'Drop Here'}
            </div>
        </div>
    );
};
