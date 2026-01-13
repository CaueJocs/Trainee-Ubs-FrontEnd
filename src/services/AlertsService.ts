import { AlertsApi } from "@/api/Alerts";
import type { AlertResponse } from "@/interfaces/Alerts";

export class AlertsService {

    static async getUnresolvedAlerts(): Promise<AlertResponse[]> {
        try {
            const response = await AlertsApi.getUnresolvedAlerts();
            return response;
        } catch (error) {
            console.error('Get Unresolved Alerts Exception:', error);
            return [];
        }
    }

    static async resolveAlert(id: string): Promise<boolean> {
        try {
            await AlertsApi.resolveAlert(id);
            return true;
        } catch (error) {
            console.error('Resolve Alert Exception:', error);
            return false;
        }
    }
    
}
