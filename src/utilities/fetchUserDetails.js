import summaryApi from "../common/CommonApi";
import Axios from "./axios";



const fetchUserDetails = async() => {
    try {
        const response = await Axios({
            ...summaryApi.userDetails
        })

        return response?.data
        
    } catch (error) {
        console.log(error);
    }
};

export default fetchUserDetails;