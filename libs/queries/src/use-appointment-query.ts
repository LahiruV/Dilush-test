import { getAxiosInstance } from "@peerless/services";
import { AppointmentAPI } from "@peerless/utils";
import axios from "axios";

const InsertAppointmentUrl = AppointmentAPI.Appointment_Insert;

export const InsertAppointment = async (payload: any): Promise<any> => {
    try {
      const response = await getAxiosInstance().post(InsertAppointmentUrl, payload);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Request failed with status:', error.response?.status);
        console.error('Response data:', error.response?.data);
      } else {
        console.error('An unexpected error occurred:', error);
      }
      throw error;
    }
};