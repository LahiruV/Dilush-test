import { getAxiosInstance } from "@peerless/services";
import { CustomerAPI, SalesAPI } from "@peerless/utils";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";

const GetOutstandingDeliveriesUrl = CustomerAPI.Get_Outstanding_Deliveries;
const GetDebtorsGraphUrl = SalesAPI.Get_Debtors_Details;
const GetSalesGraphDataUrl = SalesAPI.Get_Sales_Data;
const GetOutstandingDeliveryDateUrl = CustomerAPI.Get_Outstanding_Delivery_Date;

const fetchCustomerOutstandingDeliveryData = async ({ pageParam }: { pageParam: { startIndex: number, rowCount: number, payload: { args: any, custCode: string, marketType: number, loadData: boolean, loadInInit: boolean, viewType: string, orderType: string, catType: string } } }):
  Promise<{ data: any, nextPageParam: { startIndex: number, rowCount: number, payload: { args: any, custCode: string, marketType: number, loadData: boolean, loadInInit: boolean, viewType: string, orderType: string, catType: string } } | null }> => {
  const { startIndex, rowCount, payload } = pageParam;

  payload.args.StartIndex = startIndex;
  payload.args.RowCount = rowCount;

  try {
    const response = await getAxiosInstance().get<any>(
      GetOutstandingDeliveriesUrl + '?custCode=' + payload.custCode + '&marketType=' + payload.marketType + '&viewType=' + payload.viewType + '&orderType=' + payload.orderType + '&catType=' + payload.catType
    );

    const items = response.data;
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

export const getCustomerOutstandingDeliveryList = (payload: any, initialRowCount = 10) => {
  const {
    data,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['customer-outstanding-delivery-list', payload.marketType],
    queryFn: fetchCustomerOutstandingDeliveryData,
    initialPageParam: { startIndex: 1, rowCount: initialRowCount, payload },
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
    enabled: payload.loadData,
  });
  const customerOutstandingData = data?.pages.flatMap(page => page.data) || [];
  return {
    customerOutstandingData,
    error,
    status,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  };
};

const fetchDebtorData = async (custCode: string) => {
  const response = await getAxiosInstance().get(GetDebtorsGraphUrl + '?sCustCode=' + custCode);
  return response.data;
};

export const useDebtorData = (custCode: string) => {
  return useQuery({
    queryKey: ['GetDebtorGraph', custCode],
    queryFn: () => fetchDebtorData(custCode),
  });
};

const fetchSalesData = async (custCode: string, date: string) => {
  const response = await getAxiosInstance().get(GetSalesGraphDataUrl + '?sCustCode=' + custCode + '&date=' + date);
  return response.data;
};

export const useSalesData = (custCode: string, date: string) => {
  return useQuery({
    queryKey: ['GetSalesGraph', custCode],
    queryFn: () => fetchSalesData(custCode, date),
  });
};

const fetchDeliveryData = async (custCode: string) => {
  const response = await getAxiosInstance().get(GetOutstandingDeliveryDateUrl + '?custCode=' + custCode);
  return response.data;
};

export const useDeliveryData = (custCode: string) => {
  return useQuery({
    queryKey: ['GetDeliveryData', custCode],
    queryFn: () => fetchDeliveryData(custCode),
  });
};