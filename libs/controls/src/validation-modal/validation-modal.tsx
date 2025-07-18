import { Button } from '@progress/kendo-react-buttons';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';

export interface ValidationModalProps {
    title: string;
    message: string;
    okButtonText?: string;
    cancelButtonText?: string;
    setState: (value: boolean) => void;
    onSubmit?: Function;
    onClose?: Function;
}

/**
    * ValidationModal is a reusable component to display validation messages.
    * @param {ValidationModalProps} props - Properties for the ValidationModal.
    * @param {string} props.title - The title of the modal.
    * @param {string} props.message - The message to display in the modal.
    * @param {string} [props.okButtonText] - The text for the OK button.
    * @param {string} [props.cancelButtonText] - The text for the Cancel button.
    * @param {function} props.setState - Callback to set the state of the modal.
    * @param {function} [props.onSubmit] - Optional callback for submit action.
    * @param {function} [props.onClose] - Optional callback for close action.
    * 
    * @returns {JSX.Element} The rendered ValidationModal component.
    * 
    * @author @LahiruV 🐺
    * @date 2024-10-05
    * 
    * @returns {JSX.Element}
 */
export function ValidationModal({ title, message, okButtonText, cancelButtonText, setState, onSubmit, onClose }: ValidationModalProps) {

    const toggleDialog = () => {
        if (onSubmit) {
            onSubmit();
        }
        setState(false);
    };

    const toggleCloseDialog = () => {
        if (onClose) {
            onClose();
        }
        setState(false);
    };

    return (
        <div>
            <Dialog title={title} onClose={toggleCloseDialog}>
                <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                    <i className="pi pi-exclamation-triangle" style={{ color: '#ff911a', fontSize: '1.5rem' }}></i>
                </div>
                <span style={{ margin: '25px', textAlign: 'center' }}>{message}</span>
                <DialogActionsBar>
                    <Button id='ok-button' type="button" onClick={toggleDialog}>
                        {okButtonText || 'OK'}
                    </Button>
                    <Button id='cancel-button' type="button" onClick={toggleCloseDialog}>
                        {cancelButtonText || 'Cancel'}
                    </Button>
                </DialogActionsBar>
            </Dialog>
        </div>
    );
}
