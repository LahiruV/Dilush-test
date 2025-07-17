import { getAxiosInstance } from '@peerless/services';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ActivityAPI, AppointmentAPI } from '@peerless/utils';
import {
    SaveOtherActivityParameters,
    UpdateActivityFromPlannerParameters,
} from '@peerless/models';

export const GetAllActivities = (payload: any, isFetch: boolean) => {
    const fetchAllActivities = async (payload: any) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const data = await getAxiosInstance().post<any[]>(
            ActivityAPI.Get_All_Activities + '?repTerritory=' + payload.repTerritory,
            payload
        );
        return data.data;
    };
    const { data: allActivities, error, status } = useQuery({
        queryKey: ['get-all-activities', payload],
        queryFn: () => fetchAllActivities(payload),
        enabled: isFetch
    });
    return {
        allActivities,
        error,
        status
    };
};

export const UpdateActivityFromPlanner = () => {
    const { mutate: updateActivityFromPlannerMutate } = useMutation({
        mutationFn: async (payload: UpdateActivityFromPlannerParameters) => getAxiosInstance().post(AppointmentAPI.Appointment_Update, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        updateActivityFromPlannerMutate,
    };
};

export const SaveOtherActivity = () => {
    const { mutate: saveOtherActivityMutate } = useMutation({
        mutationFn: async (payload: SaveOtherActivityParameters) => getAxiosInstance().post(ActivityAPI.Save_Other_Activity, payload),
        onSuccess: (response: any) => response,
        onError: (err: any) => err,
    });

    return {
        saveOtherActivityMutate,
    };
};