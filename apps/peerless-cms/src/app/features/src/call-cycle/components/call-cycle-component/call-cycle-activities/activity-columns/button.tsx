import * as React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import { useDraggable, Icon, NormalizedDragEvent } from '@progress/kendo-react-common';

export const DraggableButton = (props: any) => {
    const [pressed, setPressed] = React.useState<boolean>(false);
    const [dragged, setDragged] = React.useState<boolean>(false);
    const [initial, setInitial] = React.useState<{ x: number; y: number } | null>(null);
    const button = React.useRef<any>(null);

    const handlePress = React.useCallback(() => {
        props.setSelectitem(props.draggable);
        props.setPIndex(props.pIndex);
        setPressed(true);
    }, []);

    const handleDragStart = React.useCallback((event: NormalizedDragEvent) => {
        setDragged(true);
        setInitial({ x: event.clientX, y: event.clientY });
    }, []);

    const handleDrag = React.useCallback(
        (event: NormalizedDragEvent) => {
            if (!button.current || !button.current.element || !initial) {
                return;
            }
            const transform = `translate(${event.clientX - initial.x}px, ${event.clientY - initial.y}px)`;

            button.current.element.style.transition = 'none';
            button.current.element.style.transform = transform;
        },
        [initial]
    );

    const handleDragEnd = React.useCallback(() => {
        if (!button.current || !button.current.element) {
            return;
        }

        button.current.element.style.transition = 'transform .3s ease-in-out';
        button.current.element.style.transform = '';

        setDragged(false);
        setInitial(null);
    }, []);

    const handleRelease = React.useCallback(() => {
        setPressed(false);
    }, []);

    useDraggable(button, {
        onPress: handlePress,
        onDragStart: handleDragStart,
        onDrag: handleDrag,
        onDragEnd: handleDragEnd,
        onRelease: handleRelease
    });

    return (
        <Button
            fillMode={'outline'}
            {...props}
            ref={button}
            themeColor={
                props.draggable.leadStage === 'Customer'
                    ? 'warning'
                    : props.draggable.leadStage === 'End User'
                        ? 'error'
                        : props.draggable.leadStage === 'Lead'
                            ? 'success'
                            : props.draggable.leadStage === 'Organisation'
                                ? 'info'
                                : 'tertiary'
            }
            style={{ width: 265, marginTop: 10 }}
        >
            {props.content}
        </Button>
    );
};
