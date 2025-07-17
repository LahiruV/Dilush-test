// import { Card } from "@progress/kendo-react-layout";
import * as fa2 from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './dashboard-rep-performance-widget-card.css';
import { WidgetData } from "@peerless/models";
import Typography from '@mui/joy/Typography';
import { Chip, Divider } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { CardLayers3d } from '@peerless/controls';

export interface RepWidgetCardProps {
    performanceWidgetData: WidgetData[];
    performanceWidgetQTDData: WidgetData[];
}

interface CardData {
    title: string;
    value: string | number;
    icon: any;
    color: string;
}

interface CardItemProps {
    card: CardData;
    className: string;
}

const cardData = (data: any): CardData[] => [
    { title: "MTD CONTRIBUTION", value: `${data?.mtD_Contribution?.toFixed(2) || 0} %`, icon: <EqualizerIcon style={{ fontSize: '40px', color: '#2ecc71' }} />, color: "#2ecc71" },
    { title: "MTD TONNES", value: `${data?.mtD_Tons?.toFixed(2) || 0} %`, icon: <EqualizerIcon style={{ fontSize: '40px', color: '#2ecc71', marginRight: '-60px' }} />, color: "#2ecc71" },
    { title: "QTD CONTRIBUTION", value: `${data?.qtD_Contribution?.toFixed(2) || 0} %`, icon: <EqualizerIcon style={{ fontSize: '40px', color: '#2ecc71' }} />, color: "#2ecc71" },
    { title: "QTD TONNES", value: `${data?.qtD_Tons?.toFixed(2) || 0} %`, icon: <EqualizerIcon style={{ fontSize: '40px', color: '#2ecc71', marginRight: '-800px' }} />, color: "#2ecc71" },
    { title: "CUSTOMER SALES MTD", value: '$ ' + (data?.mtD_Sales_Value?.toFixed(2) || 0), icon: <AttachMoneyIcon style={{ fontSize: '40px', color: '#f9a825' }} />, color: "#f9a825" },
    { title: "END USER SALES MTD", value: '$ ' + (data?.mtD_TIO_Value?.toFixed(2) || 0), icon: <PeopleAltIcon style={{ fontSize: '40px', color: '#e74c3c' }} />, color: "#e74c3c" },
    { title: "END USER SALES YTD", value: '$ ' + (data?.ytD_TIO_Value?.toFixed(2) || 0), icon: <PeopleAltIcon style={{ fontSize: '40px', color: '#e74c3c' }} />, color: "#e74c3c" },
    { title: "TIO MONTHLY", value: data?.mtD_TIO?.toFixed(2) || 0, icon: <CalendarMonthIcon style={{ fontSize: '40px', color: '#3498db', marginRight: '-800px' }} />, color: "#3498db" },
    { title: "TIO WEEKLY", value: data?.wtD_TIO?.toFixed(2) || 0, icon: <CalendarMonthIcon style={{ fontSize: '40px', color: '#3498db', marginRight: '-800px' }} />, color: "#3498db" },
];

const CardItem: React.FC<CardItemProps> = ({ card, className }) => (
    <div className={className}>
        <div className="center-align">
            <FontAwesomeIcon icon={card.icon} className={`${className}-icon`} color={card.color} />
            <div className={`${className}-content`}>
                <h3>{card.title}</h3>
                <p>{card.value}</p>
            </div>
        </div>
    </div>
);

export interface BasicChipProps {
    className?: string;
    variant?: 'outlined' | 'plain' | 'soft' | 'solid';
    icon?: JSX.Element;
    color?: 'primary' | 'neutral' | 'danger' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    style?: React.CSSProperties;
    label: string;
}

const BasicChip: React.FC<BasicChipProps> = ({ className, variant, icon, color, size, style, label }) => {
    variant = variant || 'solid';
    return (
        <div>
            <Chip
                size={size}
                color={color}
                className={className}
                variant={variant}
                startDecorator={icon}
                style={style}
            >
                {label}
            </Chip>
        </div>
    );
}

export function RepWidgetCard(props: RepWidgetCardProps) {
    const { performanceWidgetData } = props;

    return (
        <Grid
            container
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1, marginLeft: '2px' }}
        >
            {cardData(performanceWidgetData[0]).map((data, index) => (
                <div key={index} style={{ margin: '5px' }}>
                    <CardLayers3d
                        className={`home-card-width home-card-height`}
                        content={
                            <div className="flex align-items-center justify-content-between">
                                <div className="padding-10">
                                    {data.icon}
                                </div>
                                <div className="card-title text-align-center">
                                    <Typography
                                        className={`bolder font-14`}
                                    >
                                        {data.title.toLocaleUpperCase()}
                                    </Typography>
                                    <Divider className={`margin-auto `} sx={{ backgroundColor: '#606060', width: '50px' }} />

                                    <div style={{ marginTop: '3px' }}>
                                        <div className={` font-12`}>
                                            <BasicChip
                                                size='sm'
                                                style={{ backgroundColor: `${data.color}` }}
                                                variant={'solid'}
                                                label={`${data.value} `}
                                                className=''
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Divider />
                            </div>
                        }
                    />
                </div>
            ))}
        </Grid>
    );
}

export default RepWidgetCard;
