import { InsertPlistTemplateHeaderParameters, InsertRepMarketParameters, InsertRepProxyParameters, PlistTemplate, SaveResponseTimeParameters } from "@peerless/models";
import { getAxiosInstance } from "@peerless/services";
import { AdministratorAPI } from "@peerless/utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export const InsertRepMarket = () => {
    const { mutate: insertRepMarketMutate } = useMutation({
        mutationFn: async (payload: InsertRepMarketParameters) => getAxiosInstance().post(AdministratorAPI.Insert_Rep_Market, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        insertRepMarketMutate,
    };
};

export const InsertRepProxy = () => {
    const { mutate: insertRepProxyMutate } = useMutation({
        mutationFn: (payload: InsertRepProxyParameters) => getAxiosInstance().post(AdministratorAPI.Insert_Rep_Proxy, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        insertRepProxyMutate,
    };
};

export const SaveResponseTime = () => {
    const { mutate: saveResponseTimeMutate } = useMutation({
        mutationFn: (payload: SaveResponseTimeParameters) => getAxiosInstance().post(AdministratorAPI.Save_Response_Time + '?time=' + payload.time),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        saveResponseTimeMutate,
    };
};

export const InsertPlistTemplateHeader = () => {
    const { mutate: insertPlistTemplateHeaderMutate } = useMutation({
        mutationFn: (payload: InsertPlistTemplateHeaderParameters) => getAxiosInstance().post(AdministratorAPI.Insert_PlistTemplate_Header, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        insertPlistTemplateHeaderMutate,
    };
};

export const GetPlistTemplate = (isFetch: boolean) => {
    const fetchPlistTemplate = async () => {
        const data = await getAxiosInstance().get<PlistTemplate[]>(
            AdministratorAPI.Get_Plist_Template
        );
        return data.data;
    };
    const { data, isError } = useQuery({
        queryKey: ['get-plist-template'],
        queryFn: () => fetchPlistTemplate(),
        enabled: isFetch
    });
    return {
        data,
        isError,
    };
};
