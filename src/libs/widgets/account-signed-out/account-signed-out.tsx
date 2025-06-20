import * as React from 'react';
import {
    AuthenticationContext,
    SessionContext,
    type Session,
} from '@toolpad/core/AppProvider';
import { Account } from '@toolpad/core/Account';
import Badge, { badgeClasses } from '@mui/joy/Badge';

export interface AccountDemoSignedOutProps {
    name?: string,
    email?: string,
    image?: string,
    theme: string
    onClick: () => void
}

const AccountDemoSignedOut: React.FC<AccountDemoSignedOutProps> = ({ name, email, image, onClick }) => {
    const demoSession = React.useMemo(() => ({
        user: {
            name: name || '',
            email: email || '',
            image: image || '',
        },
    }), [name, email, image]);
    const [session, setSession] = React.useState<Session | null>(demoSession);
    const [authentic, setAuthentic] = React.useState(true)
    const authentication = React.useMemo(() => {
        return {
            signIn: () => {
                setSession(demoSession);
                setAuthentic(true)
            },
            signOut: () => {
                setSession(null);
                setAuthentic(false)
            },
        };
    }, [demoSession]);

    return (
        <AuthenticationContext.Provider value={authentication}>
            <SessionContext.Provider value={session}>
                {authentic && (
                    <Badge
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        badgeInset="14%"
                        color="success"
                        sx={{
                            [`& .${badgeClasses.badge}`]: {
                                '&::after': {
                                    position: 'absolute',
                                    top: -2,
                                    left: -2,
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
                                signOutLabel: 'Logout',
                            }}
                            slotProps={{
                                signOutButton: {
                                    id: 'log-out-button',
                                    className: `log-out-button`,
                                    onClick: onClick
                                },
                                popoverContent: {
                                    id: 'popover-content',
                                    className: `dark-background`,
                                },
                            }}
                        />
                    </Badge>
                )}
            </SessionContext.Provider>
        </AuthenticationContext.Provider>
    );
}
export default AccountDemoSignedOut;
