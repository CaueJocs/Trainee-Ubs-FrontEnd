import type { AlertResponse } from "@/interfaces/Alerts";
import { http } from "./BaseApi";

export const AlertsApi = {

  getUnresolvedAlerts: async (): Promise<AlertResponse[]> => {
    const response = await http.get<AlertResponse[]>('/alerts/unresolved');
    return response.data;
  },

  resolveAlert: async (id: string): Promise<void> => {
    await http.post(`/alerts/${id}/resolve`);
  }

};