import { useQuery } from '@tanstack/react-query';
import { getAxiosReportInstance } from '@peerless/services';
import { GeneratecontractsalesPdfParameters, GenerateEndUserPricePdfParameters } from '@peerless/models';
import { ReportAPI } from '@peerless/utils';

export const GenerateEndUserPricePdf = (payload: GenerateEndUserPricePdfParameters, isExecute: boolean) => {

    const generateEndUserPricePdf = async (payload: GenerateEndUserPricePdfParameters) => {
        const response = await getAxiosReportInstance().post<any[]>(
            ReportAPI.Generate_End_User_Price_Pdf,
            payload
        );
        return response.data;
    };

    const { data, error, status } = useQuery({
        queryKey: ['generate-end-user-price-pdf', payload],
        queryFn: () => generateEndUserPricePdf(payload),
        enabled: isExecute,
    });

    return {
        data,
        error,
        status
    };
};

export const GenerateEndUserSalesReport = (payload: GeneratecontractsalesPdfParameters, isExecute: boolean) => {
    const generateEndUserSalesReport = async (payload: GeneratecontractsalesPdfParameters) => {
        const response = await getAxiosReportInstance().post<any[]>(
            ReportAPI.Generate_End_User_Sales_Report,
            payload
        );
        return response.data;
    };
    const { data, error, status } = useQuery({
        queryKey: ['generate-end-user-sales-pdf', payload],
        queryFn: () => generateEndUserSalesReport(payload),
        enabled: isExecute,
    });
    return {
        data,
        error,
        status
    };
};