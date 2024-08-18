import axiosApp from "../lib/axiosConfig";

class AuthApi {

    async login(data){
        try {
            let response = await axiosApp.post(`${process.env.NEXT_PUBLIC_HOST}/userapp/auth/login`,data)

            return response;
        } catch (error) {
            console.log("error in chats api",error)
        }
    }

    async getUserSettings() {
    try {
        const response = await axiosApp.get(`${process.env.NEXT_PUBLIC_HOST}/settings/`, {
            withCredentials: true
        });
        if(response?.data){
            return response?.data
        }
        else{
            return false;
        }
    } catch (error) {
        console.error('Error fetching user settings:', error.response ? error.response.data : error.message);
    }
    }
    async updateUserSettings (payload) {
        try {
            const response = await axiosApp.post(`${process.env.NEXT_PUBLIC_HOST}/settings/`, payload, {
                withCredentials: true
            });
            if(response?.data){
                return response?.data
            }
            else{
                return false;
            }
        } catch (error) {
            console.error('Error updating user settings:', error.response ? error.response.data : error.message);
        }
    }
}

export const authapi = new AuthApi();