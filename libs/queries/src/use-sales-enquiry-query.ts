import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { exportToExcel, getAxiosInstance } from '@peerless/services';
import axios from 'axios';
import { ActivityAnalysis, ActivityAnalysisParameters, ActivityDataColumns, CustomerPricelist, DealEnquiry, GetCustomerPricelistParameters, GetInvoiceEnquiryParameters } from '@peerless/models';
import { CustomerAPI, SalesAPI } from '@peerless/utils';

export const GetCustomerPricelist = (payload: GetCustomerPricelistParameters, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            CustomerAPI.Get_Customer_Price_list_Details,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['customer-price-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

export const GetCustomerPricelistType = (payload: string, isExecute?: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            CustomerAPI.Get_Customer_Price_list_Type_Lookup,
            payload
        );

        return response.data;
    };

    return useQuery({
        queryKey: ['customer-price-list-type', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

export const GetCustomerPricelistCustomers = (payload: {type: string, code: string}, isExecute?: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            CustomerAPI.Get_Customer_Price_list_Customers_Lookup,
            payload
        );

        return response.data;
    };

    return useQuery({
        queryKey: ['customer-price-list-customers', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute || payload.type !== '' && payload.code !== ''
    });
};

// export const GetCustomerPricelist = (payload: GetCustomerPricelistParameters, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['customer-price-list', payload],
//         queryFn: fetchCustomerPricelist,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const customerPricelistData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         customerPricelistData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

// const fetchCustomerPricelist = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
//     Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<CustomerPricelist[]>(
//             CustomerAPI.Get_Customer_Price_list,
//             payload
//         );
//         const items = response.data;
//         const nextStartIndex = startIndex + 1;
//         const hasMoreData = items.length === rowCount;

//         return {
//             data: items,
//             nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
//         };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Request failed with status:', error.response?.status);
//             console.error('Response data');
//         } else {
//             console.error('An unexpected error occurred');
//         }
//         throw error;
//     }
// };

export const GetDealEnquiry = (payload: any, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            CustomerAPI.Get_Deal_Enquiry,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['deal-enquiry-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

// export const GetDealEnquiry = (payload: any, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['deal-enquiry-list', payload],
//         queryFn: fetchDealEnquiryList,
//         initialPageParam: { startIndex: 0, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const dealEnquiryListData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         dealEnquiryListData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

// const fetchDealEnquiryList = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
//     Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<DealEnquiry[]>(
//             CustomerAPI.Get_Deal_Enquiry,
//             payload
//         );
//         const items = response.data;
//         const nextStartIndex = startIndex + 1;
//         const hasMoreData = items.length === rowCount;

//         return {
//             data: items,
//             nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
//         };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Request failed with status:', error.response?.status);
//             console.error('Response data');
//         } else {
//             console.error('An unexpected error occurred');
//         }
//         throw error;
//     }
// };

export const GetInvoiceEnquiry = (payload: GetInvoiceEnquiryParameters, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            SalesAPI.Get_Invoice_Enquiry,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['invoice-enquiry-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};


// export const GetInvoiceEnquiry = (payload: GetInvoiceEnquiryParameters, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['invoice-enquiry-list', payload],
//         queryFn: fetchInvoiceEnquiry,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const invoiceEnquiryListData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         invoiceEnquiryListData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

// const fetchInvoiceEnquiry = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
//     Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<any[]>(
//             SalesAPI.Get_Invoice_Enquiry,
//             payload
//         );
//         const items = response.data;
//         const nextStartIndex = startIndex + 1;
//         const hasMoreData = items.length === rowCount;

//         return {
//             data: items,
//             nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
//         };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Request failed with status:', error.response?.status);
//             console.error('Response data');
//         } else {
//             console.error('An unexpected error occurred');
//         }
//         throw error;
//     }
// }

export const GetOutstandingOrders = (payload: any, isExecute: boolean) => {
    const fetchFunction = async (payload: any) => {
        const response = await getAxiosInstance().post<any>(
            SalesAPI.Get_Outstanding_Orders,
            payload
        );
        return response.data;
    };
    return useQuery({
        queryKey: ['outstanding-orders-list', payload],
        queryFn: () => fetchFunction(payload),
        enabled: isExecute
    });
};

// export const GetOutstandingOrders = (payload: any, initialRowCount = 10, isExecute: boolean) => {
//     const {
//         data,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     } = useInfiniteQuery({
//         queryKey: ['outstanding-orders-list', payload],
//         queryFn: fetchOutstandingOrders,
//         initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
//         getNextPageParam: (lastPage) => lastPage.nextPageParam,
//         enabled: isExecute
//     });

//     const outstandingOrdersListData = data?.pages.flatMap(page => page.data) || [];

//     return {
//         outstandingOrdersListData,
//         error,
//         status,
//         fetchNextPage,
//         isFetchingNextPage,
//         hasNextPage,
//     };
// };

// const fetchOutstandingOrders = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: any } }):
//     Promise<{ data: any[], nextPageParam: { startIndex: number, rowCount: number, payload: any } | null }> => {
//     const { startIndex, rowCount, payload } = pageParam;
//     payload.startIndex = startIndex;
//     payload.rowCount = rowCount;

//     try {
//         const response = await getAxiosInstance().post<any[]>(
//             SalesAPI.Get_Outstanding_Orders,
//             payload
//         );
//         const items = response.data;
//         const nextStartIndex = startIndex + 1;
//         const hasMoreData = items.length === rowCount;

//         return {
//             data: items,
//             nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,
//         };
//     } catch (error) {
//         if (axios.isAxiosError(error)) {
//             console.error('Request failed with status:', error.response?.status);
//             console.error('Response data');
//         } else {
//             console.error('An unexpected error occurred');
//         }
//         throw error;
//     }
// };

export const GetAllCostPeriod = (isFetch: boolean) => {
    const fetchGetAllCostPeriod = async () => {
        const data = await getAxiosInstance().post<any[]>(
            SalesAPI.Get_All_Cost_Period
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['get-all-cost-period'],
        queryFn: () => fetchGetAllCostPeriod(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};


// export const GetCustomerPricelistExcel = (e: ActivityAnalysisParameters, isExecute: boolean, setState?: Function, isExcel?: boolean) => {
//     const fetchSalesAchievement = async () => {
//         const data = await getAxiosInstance().post<ActivityAnalysis[]>(
//             ActivityAPI.Get_All_Activities_By_Type, e
//         );
//         if (setState) {
//             if (isExcel) {
//                 try {
//                     await exportToExcel(data.data, ActivityDataColumns, 'Activity Analysis', '7FFFD4');
//                 } catch (error) {
//                     console.error("Error exporting data:", error);
//                 } finally {
//                     setState(false);
//                 }
//             }
//             setState(false);
//         }
//         return data.data;
//     };
//     const { data: responseData, error, status, } = useQuery({
//         queryKey: ['activity-analysis-list-excel'],
//         queryFn: () => fetchSalesAchievement(),
//         enabled: isExecute,
//     });
//     return {
//         responseData,
//         status,
//         error,
//     };
// };