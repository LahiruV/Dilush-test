import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from 'react-redux';
import { resetState, store } from '@peerless-cms/store';
import { useAuthContext } from '@peerless/providers';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import persistStore from 'redux-persist/es/persistStore';

const theme = createTheme({
    palette: {
        primary: {
            light: '#4caf50',
            main: '#35ad00',
            dark: '#309e01',
            contrastText: '#fff',
        },
    },
});

export interface LogoutBoxProps {
    isOpen: boolean;
    setIsSetOpen: (value: boolean) => void;
}

export function LogoutBox(props: LogoutBoxProps) {
    const dispatch = useDispatch();
    const { handleLogout } = useAuthContext();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        props.setIsSetOpen(false);
        setOpen(false);
    };

    const logOutFunction = () => {
        dispatch(resetState());
        persistStore(store).purge();
        props.setIsSetOpen(false);
        setOpen(false);
        handleLogout();
    };

    React.useEffect(() => {
        if (props.isOpen) {
            setOpen(true);
        }
    }, [props.isOpen]);

    return (
        <ThemeProvider theme={theme}>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div style={{
                    width: '300px',
                    padding: '10px',
                }}>
                    <DialogTitle id="alert-dialog-title" style={{ fontSize: '16px' }}>
                        {"Please confirm"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" style={{ fontSize: '12px' }}>
                            Are you sure you want to log out?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant='contained' size="small" onClick={logOutFunction} style={{ fontSize: '11px', backgroundColor: '#198754' }}>Yes</Button>
                        <Button variant='contained' size="small" onClick={handleClose} autoFocus style={{ fontSize: '11px', backgroundColor: '#c73d3d' }}>
                            No
                        </Button>
                    </DialogActions>
                </div>
            </Dialog>
        </ThemeProvider>
    );
}
