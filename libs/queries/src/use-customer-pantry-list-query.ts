import { getAxiosInstance } from "@peerless/services";
import { CatalogAPI, CommonAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetCustomerPantryListUrl = CatalogAPI.Get_Customer_Pantry_List;  
const updateCustomerPantryListItemUrl = CatalogAPI.Update_Customer_Pantry_List_Item;

// const fetchCustomerPantryListData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: { args: any } } }): 
//         Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any } } | null }> => {
//   const { startIndex, rowCount, payload } = pageParam;  
  
//   payload.args.StartIndex = startIndex;
//   payload.args.RowCount = rowCount;
  
//   try {    
//     const response = await getAxiosInstance().post<any>(
//         GetCustomerPantryListUrl,
//         payload.args
//     );

//     const  items = response.data;
//     const nextStartIndex = startIndex + 1;     
//     const hasMoreData = items.length === rowCount; 

//     return {
//       data: items,
//       nextPageParam: hasMoreData ? { startIndex: nextStartIndex, rowCount, payload } : null,  
//     };
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error('Request failed with status:', error.response?.status);
//       console.error('Response data:', error.response?.data);
//     } else {
//       console.error('An unexpected error occurred:', error);
//     }
//     throw error; 
//   }
// }; 


// export const getCustomerPantryList = (payload: any, initialRowCount = 10) => {     
//     const {
//       data,
//       error,
//       status,
//       fetchNextPage,
//       isFetchingNextPage,
//       hasNextPage,     
//       refetch
//     } = useInfiniteQuery({
//       queryKey: ['customer-pantry-list', payload.CustomerCode],
//       queryFn: fetchCustomerPantryListData, 
//       initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload }, 
//       getNextPageParam: (lastPage) => lastPage.nextPageParam,  
//       enabled: payload.loadData,
//     });           
//     const customerPantryListData = data?.pages.flatMap(page => page.data) || [];    
//     return {
//       customerPantryListData,
//       error,
//       status,
//       fetchNextPage,
//       isFetchingNextPage,
//       hasNextPage, 
//       refetch
//     };
//   };

const fetchCustomerPantryListData = async (payload: any) => {
    const response = await getAxiosInstance().post(GetCustomerPantryListUrl, payload);
    return response.data;
};

export const getCustomerPantryList = (payload: any) => {       
    return useQuery({
        queryKey: ['customer-pantry-list', payload],
        queryFn: () => fetchCustomerPantryListData(payload),
    });
};

  export const updateCustomerPantryListItem = async (payload: any) => {
    try {
      const response = await getAxiosInstance().post(updateCustomerPantryListItemUrl + '?catlogCode=' + payload.catlogCode + '&isUsed=' + payload.isUsed, payload.pantrylistId);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Request failed with status:', error.response?.status);
        console.error('Response data');
      } else {
        console.error('An unexpected error occurred');
      }
      throw error;
    }
  }