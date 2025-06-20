import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';

export interface AlertDialogModalProps {
    theme: string
    open: boolean
    labelTitle: string
    labelContent: string
    labelYes?: string
    labelNo?: string
    colorYes?: 'danger' | 'neutral' | 'primary' | 'success' | 'warning'
    colorNo?: 'danger' | 'neutral' | 'primary' | 'success' | 'warning'
    variantYes?: 'solid' | 'soft' | 'outlined' | 'plain'
    variantNo?: 'solid' | 'soft' | 'outlined' | 'plain'
    setOpen: (open: boolean) => void
    onClickY: () => void
    onClickN: () => void
}

const AlertDialogModal: React.FC<AlertDialogModalProps> = ({
    theme,
    open,
    labelTitle,
    labelContent,
    labelYes,
    labelNo,
    colorYes,
    colorNo,
    variantYes,
    variantNo,
    setOpen,
    onClickY,
    onClickN,
}) => {
    labelYes = labelYes || 'Yes';
    labelNo = labelNo || 'No';
    colorYes = colorYes || 'primary';
    colorNo = colorNo || 'neutral';
    variantYes = variantYes || 'solid';
    variantNo = variantNo || 'soft';
    return (
        <React.Fragment>
            <Modal className={`${theme}-background`} open={open} onClose={() => setOpen(false)}>
                <ModalDialog variant="outlined" role="alertdialog" className={`${theme}-background ${theme}-border`} >
                    <DialogTitle className={`${theme}-font`}>
                        <WarningRoundedIcon />
                        {labelTitle}
                    </DialogTitle>
                    <Divider />
                    <DialogContent className={`${theme}-font font-12`}>
                        {labelContent}
                    </DialogContent>
                    <DialogActions>
                        <Button className={`${theme}-border font-12`} variant={variantYes} color={colorYes} onClick={onClickY}>
                            {labelYes}
                        </Button>
                        <Button className={`${theme}-border font-12`} variant={variantNo} color={colorNo} onClick={onClickN}>
                            {labelNo}
                        </Button>
                    </DialogActions>
                </ModalDialog>
            </Modal>
        </React.Fragment>
    );
}

export default AlertDialogModal;