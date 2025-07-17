// Modal.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css'; 

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isOverlay?: boolean; 
  position?: { top: number; left: number } | null;
  customCss?: string;
  showCloseButton?: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, isOverlay, position, customCss, showCloseButton = true }) => {
  if (!isOpen) return null;

  const modalStyle: React.CSSProperties = position
    ? {
        position: 'absolute',
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: 'translateY(0)',
      }
    : {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };

  return ReactDOM.createPortal(
    <div className={`custom-modal-overlay ${isOverlay ? 'custom-modal-overlay-active ' : ''} ${customCss}`} onClick={onClose}>
      <div className="custom-modal-content" onClick={(e) => e.stopPropagation()}
        style={modalStyle}>
        {
          showCloseButton && <button className="custom-modal-close" onClick={onClose}>
            &times;
          </button> 
        }
        {children}
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default Modal;
