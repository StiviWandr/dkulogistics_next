import { store } from "@/Store/store";
import { apiUrl } from "@/api/config";
import axios from "axios";

let isAuthenticated = false;
if(store.getState().user.token){
    async()=>{
        try{
            const response = await axios.get(`${apiUrl}/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            isAuthenticated = true
        }catch(e){
            isAuthenticated = false
        }
    }
    
    
}
export default isAuthenticated;