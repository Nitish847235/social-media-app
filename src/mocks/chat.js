import axiosApp from "../lib/axiosConfig";

class ChatApi {

    async findAllChat(page=1,limit=10){
        try {
            let response = await axiosApp.get(`${process.env.NEXT_PUBLIC_HOST}/userapp/chat/findAllChat?page=${page}&limit=${limit}`)

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

export const chatApi = new ChatApi();