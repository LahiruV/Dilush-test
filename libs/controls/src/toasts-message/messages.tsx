import React, { forwardRef } from 'react';
import { Messages } from 'primereact/messages';
import './messages.css'

export const ToastMessages = forwardRef((props, ref: any) => {

    return (
        <div style={{
            position: 'fixed',
            bottom: '1%',
            left: '1%',
            zIndex: '1000',
            width: 'auto',
            maxWidth: '90vw',
        }}>
            <Messages ref={ref} />
        </div>
    );
});

export default ToastMessages;