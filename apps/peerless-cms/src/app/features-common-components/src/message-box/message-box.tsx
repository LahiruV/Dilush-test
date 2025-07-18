import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, messageTypeEnum, showMessage } from '@peerless-cms/store';

import './message-box.css'; 

const MessageBox = () => {
    const dispatch = useDispatch();
    const { isVisible, message, messageType } = useSelector((state: RootState) => state.messageBox.message);
  
    useEffect(() => {    
      if (isVisible) {
        const timer = setTimeout(() => {
          dispatch(showMessage({ isVisible: false, message: '', messageType: messageTypeEnum.Success }));
        }, 3000); 
  
        return () => clearTimeout(timer); 
      }
    }, [isVisible, dispatch]);
  
    if (!isVisible) return null;
  
    return (
      <div className="center-container">
        <span className={`message ${messageType == messageTypeEnum.Success ? 'success' : messageType == messageTypeEnum.Error ? 'error' : 'warning'}`}>
          {message}
        </span>
      </div>
    );
  };

export default MessageBox;
