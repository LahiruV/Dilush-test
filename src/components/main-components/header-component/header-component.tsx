import React, { useState } from 'react';
import { AccountDemoSignedOut, AlertDialogModal } from '@zenra/widgets';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import './header-component.css';
import { reset_redux } from '@zenra/functions';
import { authService } from '@zenra/services';

export interface HeaderProps {
    isAuthenticated: boolean
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
    const { theme } = useSelector((state: RootState) => state.theme);
    const { loggedUser } = useSelector((state: RootState) => state.user);
    const [open, setOpen] = useState(false);

    const handleSignOut = () => {
        authService.clearToken();
        reset_redux();
        setOpen(false);
        window.location.href = '/';
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <header className={`main-header  dark-background dark-main-header`}>
                <div></div>
                {isAuthenticated && (
                    <div className='flex align-items-center'>
                        <NotificationsIcon className={`margin-right-20 dark-icon`} />
                        <PeopleIcon className={`margin-right-20 dark-icon`} />
                        <div className="margin-right-20">
                            <span>🇱🇰</span>
                        </div>
                        <div className="cursor" >
                            <AccountDemoSignedOut onClick={handleOpen} theme={theme} name={loggedUser.name} email={loggedUser.email} image={`data:image/png;base64,${loggedUser.profile}`} />
                        </div>
                    </div>
                )}
            </header>
            <AlertDialogModal theme={theme} open={open} setOpen={setOpen} labelTitle='Logout' colorYes='danger' labelContent='Are you sure you want to logout?' onClickY={handleSignOut} onClickN={handleClose} />
        </div>
    );
};

export default Header;
