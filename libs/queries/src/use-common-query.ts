import { getAxiosInstance } from '@peerless/services';
import { useQuery } from '@tanstack/react-query';
import { AdministratorAPI, CommonAPI, CustomerAPI, RebateAPI } from '@peerless/utils';
import {
    AllMarketForLookup, AllMarketForRep, AllParentCustomersLookup, AllRepsForLookup, CustomerLookup, GeneralLookupEntries, GetAllMarketForLookupParameters, GetAllMarketForRepParameters,
    GetAllParentCustomersLookupParameters, GetAllRepsForLookupParameters, GetAllWareHousesParameters, GetCustomerLookupParameters, GetGeneralLookupEntriesParameters, GetParentCustomerParameters, GetPlistTemplateDetailParameters, GetProductGroupLookupParameters,
    GetProxyForRepParameters, GetReportNumbersParameters, PlistTemplateDetail, ProductGroupLookup, ProxyForRep, SalesMarket,
    WarehouseLookup
} from '@peerless/models';

const getAllStatesUrl = CommonAPI.Get_All_States;
const getCountriesUrl = CommonAPI.Get_Countries;
const getProductsLookupUrl = CommonAPI.Get_Products_Lookup;

interface EffectiveDateItem {
    effectiveDate: string;
    endDate: string;
    customerCode: string;
}

// Define the full response structure
interface CustomerEffectiveDatesResponse {
    customerEffectiveDates: EffectiveDateItem[];
    selectedDate: EffectiveDateItem;
    isAllEffectiveDate: boolean;
}

const fetchStatesData = async () => {
    const response = await getAxiosInstance().get(getAllStatesUrl);
    return response.data;
};

export const useStatesData = () => {
    return useQuery({
        queryKey: ['GetAllStates'],
        queryFn: () => fetchStatesData(),
    });
};

const fetchCountryData = async () => {
    const response = await getAxiosInstance().get(getCountriesUrl);
    return response.data;
};

export const useCountryData = () => {
    return useQuery({
        queryKey: ['GetCountry'],
        queryFn: () => fetchCountryData(),
    });
};

const fetchProductsLookupData = async (args: any) => {
    if (args.ChildOriginators && args.ChildOriginators.length === 0) {
        return [];
    }
    const response = await getAxiosInstance().post(getProductsLookupUrl, args);
    return response.data;
};

export const useProductsLookupData = (args: any) => {
    return useQuery({
        queryKey: ['GetProductsLookup', args],
        queryFn: () => fetchProductsLookupData(args),
    });
};

export const GetSalesMarkets = () => {
    const fetchSalesMarkets = async () => {
        const data = await getAxiosInstance().get<SalesMarket[]>(
            CommonAPI.Get_Sales_Markets
        );
        return data.data;
    };
    const { data: allSalesMarketData, error: isAllSalesMarketDataError } = useQuery({
        queryKey: ['all-sales-market'],
        queryFn: () => fetchSalesMarkets()
    });
    return {
        allSalesMarketData,
        isAllSalesMarketDataError,
    };
};

export const GetAllMarketForRep = (payload: GetAllMarketForRepParameters, isFetch: boolean) => {
    const fetchAllMarketForRep = async (payload: GetAllMarketForRepParameters) => {
        if (payload.repCode == "") {
            return [];
        }
        const data = await getAxiosInstance().post<AllMarketForRep[]>(
            CommonAPI.Get_All_Market_For_Rep,
            payload
        );
        return data.data;
    };
    const { data: allMarketForRep, error: isAllMarketForRepError } = useQuery({
        queryKey: ['all-market-for-rep', payload],
        queryFn: () => fetchAllMarketForRep(payload),
        enabled: isFetch
    });
    return {
        allMarketForRep,
        isAllMarketForRepError,
    };
};

export const GetAllRepsForLookup = (payload: GetAllRepsForLookupParameters, isFetch: boolean) => {
    const fetchAllRepsForLookup = async (payload: GetAllRepsForLookupParameters) => {
        const data = await getAxiosInstance().post<AllRepsForLookup[]>(
            CommonAPI.Get_All_Reps_For_Lookup,
            payload
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['all-reps-for-lookup'],
        queryFn: () => fetchAllRepsForLookup(payload),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};


export const GetProxyForRep = (payload: GetProxyForRepParameters, isFetch: boolean) => {
    const fetchProxyForRep = async (payload: GetProxyForRepParameters) => {
        const data = await getAxiosInstance().post<ProxyForRep[]>(
            CommonAPI.Get_Proxy_For_Rep,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['proxy-for-rep', payload],
        queryFn: () => fetchProxyForRep(payload),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetResponseTime = (isFetch: boolean) => {
    const fetchResponseTime = async () => {
        const data = await getAxiosInstance().post<number>(
            AdministratorAPI.Get_Response_Time
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['response-time'],
        queryFn: () => fetchResponseTime(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetPlistTemplateDetail = (payload: GetPlistTemplateDetailParameters, isFetch: boolean) => {
    const fetchPlistTemplateDetail = async () => {
        if (payload.searchTerm == "") {
            return [];
        }
        const data = await getAxiosInstance().post<PlistTemplateDetail[]>(
            CommonAPI.Get_Plist_Template_Detail,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['plist-template-detail', payload],
        queryFn: () => fetchPlistTemplateDetail(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetCustomerLookup = (payload: GetCustomerLookupParameters, isFetch: boolean) => {
    const fetchCustomerLookup = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<CustomerLookup[]>(
            CustomerAPI.Get_Customer_Lookup,
            payload
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['customer-lookup', payload],
        queryFn: () => fetchCustomerLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetCustomerEffectiveDates = (payload: any, isFetch?: boolean) => {
    const fetchCustomerEffectiveDates = async () => {
        const data = await getAxiosInstance().post<CustomerEffectiveDatesResponse>(
            CustomerAPI.Get_Customer_Effective_Dates,
            payload
        );
        return data.data; // Return the full response object instead of just customerEffectiveDates
    };

    const { data, isError } = useQuery({
        queryKey: ['customer-effective-dates', payload],
        queryFn: () => fetchCustomerEffectiveDates(),
        enabled: isFetch || payload?.customerCode !== "",
    });

    return {
        data, // Now typed as CustomerEffectiveDatesResponse | undefined
        isError,
    };
};

export const GetAllParentCustomersLookup = (payload: GetAllParentCustomersLookupParameters, isFetch: boolean) => {
    const fetchAllParentCustomersLookup = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<AllParentCustomersLookup[]>(
            CommonAPI.Get_All_Parent_Customers_Lookup,
            payload
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['all-parent-customers-lookup', payload],
        queryFn: () => fetchAllParentCustomersLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetGeneralLookupEntries = (payload: GetGeneralLookupEntriesParameters, isFetch: boolean) => {
    const fetchtGeneralLookupEntries = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<GeneralLookupEntries[]>(
            CommonAPI.Get_General_Lookups_Entries + `?sTableID=${payload.sTableID}`,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['general-lookup-entries', payload],
        queryFn: () => fetchtGeneralLookupEntries(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetAllMarketForLookup = (payload: GetAllMarketForLookupParameters, isFetch: boolean) => {
    const fetchtAllMarketForLookup = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<AllMarketForLookup[]>(
            CommonAPI.Get_All_Market_For_Lookup,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['all-market-for-lookup', payload],
        queryFn: () => fetchtAllMarketForLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetProductGroupLookup = (payload: GetProductGroupLookupParameters, isFetch: boolean) => {
    const fetchtProductGroupLookup = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<ProductGroupLookup[]>(
            CommonAPI.Get_Product_Group_Lookup,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['all-product-group-lookup', payload],
        queryFn: () => fetchtProductGroupLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetAllWareHouses = (payload: GetAllWareHousesParameters, isFetch: boolean) => {
    const fetchtAllWareHouses = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<WarehouseLookup[]>(
            CommonAPI.Get_All_Ware_Houses,
            payload
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['all-ware-houses', payload],
        queryFn: () => fetchtAllWareHouses(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};

export const GetReps = (isFetch: boolean) => {
    const fetchReps = async () => {
        const data = await getAxiosInstance().get<any[]>(
            CommonAPI.Get_Reps
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['get-reps'],
        queryFn: () => fetchReps(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
}

export const GetLookup = (tableID: string, isFetch: boolean) => {
    const fetchLookup = async () => {
        const data = await getAxiosInstance().post<any[]>(
            CommonAPI.Get_Lookup, tableID
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['get-lookup', tableID],
        queryFn: () => fetchLookup(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetParentCustomer = (payload: GetParentCustomerParameters, isFetch: boolean) => {
    const fetchData = async () => {
        if (payload.childOriginators == null) {
            return [];
        }
        const data = await getAxiosInstance().post<any[]>(
            RebateAPI.Get_Parent_Customer + `?isBrowsAvailable=${payload.isBrowsAvailable}`,
            payload
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['get-parent-customer', payload],
        queryFn: () => fetchData(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetStatesOfReps = (isFetch: boolean) => {
    const fetchData = async () => {
        const data = await getAxiosInstance().get<any[]>(
            CommonAPI.Get_States_Of_Reps
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['get-states-of-reps'],
        queryFn: () => fetchData(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetReportNumbers = (payload: GetReportNumbersParameters, isFetch: boolean) => {
    const fetchData = async () => {
        const data = await getAxiosInstance().post<any[]>(
            RebateAPI.Get_Report_Numbers, payload
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['get-report-numbers'],
        queryFn: () => fetchData(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};

export const GetERPCustomers = (isFetch: boolean) => {
    const fetchData = async () => {
        const data = await getAxiosInstance().get<any[]>(
            CustomerAPI.Get_ERP_Customers
        );
        return data.data;
    };
    const { data, isError, isLoading } = useQuery({
        queryKey: ['get-erp-customers'],
        queryFn: () => fetchData(),
        enabled: isFetch
    });
    return {
        data,
        isError,
        isLoading
    };
};