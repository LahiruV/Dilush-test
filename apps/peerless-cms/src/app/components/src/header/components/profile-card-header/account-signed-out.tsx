import * as React from 'react';
import {
    AuthenticationContext,
    SessionContext,
    type Session,
} from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import './account-signed-out.css';

export interface AccountDemoSignedOutProps {
    name?: string,
    email?: string,
    image?: string,
    onClick: () => void
}

/**
 * AccountDemoSignedOut component provides a demo account sign-out functionality.
 * It uses the Toolpad core Account component to display user information
 * and a sign-out button.
 * @param {AccountDemoSignedOutProps} props - The properties for the component.
 * @param {string} props.name - The name of the user.
 * @param {string} props.email - The email of the user.
 * @param {string} props.image - The image URL of the user.
 * @param {() => void} props.onClick - The function to call when the sign-out button is clicked.
 * @returns {JSX.Element} The rendered component.
 * @author @LahiruV 🐺
 * @date 2025-05-30
 */

const AccountDemoSignedOut: React.FC<AccountDemoSignedOutProps> = ({ name, email, image, onClick }) => {
    const demoSession = {
        user: {
            name: name || '',
            email: email || '',
            image: image || '',
        },
    }
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
            },
            signOut: () => {
                console.log('Sign out clicked');
            },
        };
    }, []);

    return (
        <AuthenticationContext.Provider value={authentication}>
            <SessionContext.Provider value={demoSession}>
                <Badge
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeInset="14%"
                    color="success"
                    sx={{
                        [`& .${badgeClasses.badge}`]: {
                            '&::after': {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                animation: 'ripple 1.2s infinite ease-in-out',
                                border: '2px solid',
                                borderColor: 'success.500',
                                content: '""',
                            },
                        },
                        '@keyframes ripple': {
                            '0%': {
                                transform: 'scale(1)',
                                opacity: 1,
                            },
                            '100%': {
                                transform: 'scale(2)',
                                opacity: 0,
                            },
                        },
                    }}
                >
                    <Account
                        localeText={{
                            accountSignOutLabel: 'Log out',
                        }}
                        slotProps={{
                            signOutButton: {
                                id: 'log-out-button',
                                className: `log-out-button`,
                                onClick: onClick
                            },
                            popoverContent: {
                                id: 'popover-content',
                                className: `custom-account-popover`,
                            },
                        }}
                    />
                </Badge>
            </SessionContext.Provider>
        </AuthenticationContext.Provider>
    );
}
export default AccountDemoSignedOut;
