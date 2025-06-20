import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';

export interface CardLayers3dProps {
    className?: string
    content: React.ReactNode
}

const CardLayers3d: React.FC<CardLayers3dProps> = ({ className, content }) => {
    return (
        <Box
            sx={{
                perspective: '4000px',
                transition: 'transform 0.4s',
                '& > div, & > div > div': {
                    transition: 'inherit',
                },
                '&:hover': {
                    '& > div': {
                        transform: 'rotateY(30deg)',
                        '& > div:nth-of-type(2)': {
                            transform: 'scaleY(0.9) translate3d(20px, 30px, 40px)',
                        },
                        '& > div:nth-of-type(3)': {
                            transform: 'translate3d(45px, 50px, 40px)',
                        },
                    },
                },
            }}
        >
            <Card
                variant="solid"
                className={`${className}`}
            >
                {content}
            </Card>
        </Box>
    );
}
export default CardLayers3d;
