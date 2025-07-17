import { getAxiosInstance } from "@peerless/services";
import { CustomerAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetCustomerPricelistUrl = CustomerAPI.Get_Customer_Price_list;  
const GetDealsForCustomerPricelistUrl = CustomerAPI.Get_Deals_For_Customer_Price_list;  

const fetchCustomerPriceListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: { args: any, custCode: string, state: any, effectiveDate: any, asAtDate: any, loadData: boolean} } }): 
        Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, custCode: string, state: any, effectiveDate: any, asAtDate: any, loadData: boolean} } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;  
  
  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;
  
  try {    
    const response = await getAxiosInstance().post<any>(
        GetCustomerPricelistUrl + '?CustCode=' + payload.custCode + '&state=' + payload.state + '&AsAtDate=' + payload.asAtDate,
        payload.args
    );

    const  items = response.data;
    const nextStartIndex = startIndex + 1;     
    const hasMoreData = items.length === rowCount; 

    return {
      data: items,
      nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,  
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed with status:', error.response?.status);
      console.error('Response data');
    } else {
      console.error('An unexpected error occurred');
    }
    throw error; 
  }
}; 

// export const getCustomerPriceList = (payload: any, initialRowCount = 10) => {     
//     const {
//       data,
//       error,
//       status,
//       isLoading,
//       fetchNextPage,
//       isFetchingNextPage,
//       hasNextPage,     
//     } = useInfiniteQuery({
//       queryKey: ['customer-price-list', payload.custCode, payload.loadData, payload.state, payload.effectiveDate, payload.asAtDate],
//       queryFn: fetchCustomerPriceListData, 
//       initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
//       getNextPageParam: (lastPage) => lastPage.nextPageParam,  
//       enabled: payload.loadData,
//     });           
//     const customerPriceListData = data?.pages.flatMap(page => page.data) || [];    
//     return {
//       customerPriceListData,
//       error,
//       status,
//       isLoading,
//       fetchNextPage,
//       isFetchingNextPage,
//       hasNextPage, 
//     };
//   };

  export const getCustomerPriceList = (payload: any, isExecute: boolean) => {
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

const fetchCustomerPriceData = async (args: any, custCode: any, catlogCode: any, minQty: any, asAtDate: any) => {
    const response = await getAxiosInstance().post(GetDealsForCustomerPricelistUrl + '?CustCode=' + custCode + '&catlogCode=' + catlogCode + '&minQty=' + minQty + '&AsAtDate=' + asAtDate, args);
    return response.data;
};

export const getCustomerDeals = (args: any, custCode: any, catlogCode: any, minQty: any, asAtDate: any, enabled: boolean) => {
    return useQuery({
        queryKey: ['GetDeals', custCode, catlogCode, asAtDate],
        queryFn: () => fetchCustomerPriceData(args, custCode, catlogCode, minQty, asAtDate),
        enabled: enabled,
    });
};