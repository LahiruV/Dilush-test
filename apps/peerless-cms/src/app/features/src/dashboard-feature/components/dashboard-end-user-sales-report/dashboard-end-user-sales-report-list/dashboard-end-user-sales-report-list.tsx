import { RootState, setIsFetchPdfEndUserSalesListReport } from '@peerless-cms/store';
import { useSelector } from 'react-redux';
import { GenerateEndUserSalesReport } from '@peerless/queries';
import { PdfView } from '@peerless/controls';
import { GeneratecontractsalesPdfParameters, RenderStatusContentTable } from '@peerless/models';

const DashboardEndUserSalesReportList: React.FC = () => {

    const {
        isFetchPdfEndUserSaleListReport,
        dashEnduserSalesCheckArea,
        dashEnduserSalesCostPeriod,
        dashEnduserSalesCostYear,
        dashEnduserSalesDistributor,
        dashEnduserSalesEnduser,
        dashEnduserSalesRep
    } = useSelector((state: RootState) => state.dashboardEndUserSales);

    const reportPayload: GeneratecontractsalesPdfParameters =
    {
        CustCode: dashEnduserSalesDistributor?.value || '',
        RepCode: dashEnduserSalesRep?.value || '',
        EnduserCode: dashEnduserSalesEnduser?.value || '',
        CostYear: parseInt(dashEnduserSalesCostYear?.value || '0'),
        CostPeriod: parseInt(dashEnduserSalesCostPeriod?.value || '0'),
        CheckArea: parseInt(dashEnduserSalesCheckArea?.value || '0')
    }

    const { data: generateEndUserSalesPdfData, status: reportStatus, error: reportEror } = GenerateEndUserSalesReport(reportPayload, isFetchPdfEndUserSaleListReport)

    const renderStatusContentPdf = {
        isRenderStatusContentTable: true,
        status: reportStatus,
        isFetch: isFetchPdfEndUserSaleListReport,
        error: reportEror,
        setStateFunction: setIsFetchPdfEndUserSalesListReport,
        isStatusOutput: true
    } as RenderStatusContentTable;

    return (
        <div>
            <div>
                <PdfView data={`${generateEndUserSalesPdfData}`} renderStatusContent={renderStatusContentPdf} />
            </div>
        </div>
    );
};

export default DashboardEndUserSalesReportList;
