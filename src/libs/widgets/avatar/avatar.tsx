import Box from '@mui/joy/Box';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Avatar from '@mui/joy/Avatar';

export interface BadgeAvatarsProps {
    image: string
}

const BadgeAvatars: React.FC<BadgeAvatarsProps> = ({ image }) => {
    return (
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
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
                <Avatar alt="Remy Sharp" src={image || ''} />
            </Badge>
        </Box>
    );
}


export default BadgeAvatars;