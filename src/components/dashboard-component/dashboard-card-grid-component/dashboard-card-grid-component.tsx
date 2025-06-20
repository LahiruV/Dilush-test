import Grid from '@mui/joy/Grid';
import { useSelector } from 'react-redux';
import { RootState } from '@zenra/store';
import Typography from '@mui/joy/Typography';
import { Divider } from '@mui/joy';
import { BasicChip, CardLayers3d } from '@zenra/widgets';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import './dashboard-card-grid-component.css';
import { ExpenseMonthResponse, FinanceMonthResponse, FinanceYearResponse } from '@zenra/model';

export interface DashBoardCardGridProps {
    thisMonth: FinanceMonthResponse
    lastMonth: FinanceMonthResponse
    thisYear: FinanceYearResponse
    lastYear: FinanceYearResponse
    thisMonthExpense: ExpenseMonthResponse
    todayExpenseCount: number
    allExpenseCount: number
    allFinanceCount: number
}
const DashBoardCardGrid: React.FC<DashBoardCardGridProps> = ({
    thisMonth,
    lastMonth,
    thisYear,
    lastYear,
    thisMonthExpense,
    todayExpenseCount,
    allExpenseCount,
    allFinanceCount
}) => {

    const { theme } = useSelector((state: RootState) => state.theme);

    const cardData = [
        {
            title: lastMonth?.month + " Income",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#1976D2' }} />,
            content: lastMonth?.amount?.toLocaleString() || 0,
            color: '#1976D2',
            suffix: 'LKR'
        },
        {
            title: thisMonth?.month + " Income",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#C62828' }} />,
            content: thisMonth?.amount?.toLocaleString() || 0,
            color: '#C62828',
            suffix: 'LKR'
        },
        {
            title: lastYear?.year + " Income",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#F9A825' }} />,
            content: lastYear?.amount?.toLocaleString() || 0,
            color: '#F9A825',
            suffix: 'LKR'
        },
        {
            title: thisYear?.year + " Income",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#2E7D32' }} />,
            content: thisYear?.amount?.toLocaleString() || 0,
            color: '#2E7D32',
            suffix: 'LKR'
        },
        {
            title: 'Today' + " Expenses",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#141a21' }} />,
            content: todayExpenseCount?.toLocaleString() || 0,
            color: '#141a21',
            suffix: 'LKR'
        },
        {
            title: thisMonthExpense?.month + " Expenses",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#141a21' }} />,
            content: thisMonthExpense?.amount?.toLocaleString() || 0,
            color: '#141a21',
            suffix: 'LKR'
        },
        {
            title: "Expenses",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#141a21' }} />,
            content: allExpenseCount?.toLocaleString() || 0,
            color: '#141a21',
            suffix: 'LKR'
        },
        {
            title: "Income",
            icon: <AttachMoneyIcon style={{ fontSize: '70px', color: '#635bff' }} />,
            content: allFinanceCount?.toLocaleString(),
            color: '#635bff',
            suffix: 'LKR'
        },
    ];

    return (
        <Grid
            container
            spacing={{ xs: 2, md: 0.5 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
            sx={{ flexGrow: 1 }}
        >
            {cardData.map((data, index) => (
                <div key={index} className='padding-5'>
                    <CardLayers3d
                        className={`home-card-width height-80 ${theme}-background ${theme}-border`}
                        content={
                            <div className="flex align-items-center justify-content-between">
                                <div className="padding-10">
                                    {data.icon}
                                </div>
                                <div className="card-title text-align-center">
                                    <Typography
                                        className={`${theme}-card-font bolder font-14 padding-bottom-5`}
                                    >
                                        {data.title.toLocaleUpperCase()}
                                    </Typography>
                                    <Divider className={`width-100 margin-auto ${theme}-border-background`} />

                                    <div className={`padding-top-5`}>
                                        <div className={`${theme}-card-font font-12`}>
                                            <BasicChip
                                                size='sm'
                                                style={{ backgroundColor: `${data.color}` }}
                                                variant={'solid'}
                                                label={`${data.content} ${data.suffix || ''}`}
                                                className='dark-font'
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
};

export default DashBoardCardGrid;
