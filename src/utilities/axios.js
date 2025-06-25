import axios from "axios";
import summaryApi, { baseURL } from "../common/CommonApi";

 const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})


// sending access token in the header
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem("accessToken")

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

// expand the lifespan of access token with the help to refresh token

Axios.interceptors.request.use(
    (res)=>{
        return res
    },
    async(error)=>{
        let originalRequest = error.config

        if(error.res.status === 401 && !originalRequest.retry)
        {
            originalRequest.retry = true
            const refreshToken = localStorage.getItem("refreshToken")
            if(refreshToken)
            {
                const newAccessToken = await refreshAccesstoken(refreshToken)

                if(newAccessToken)
                {
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originalRequest)
                }
                console.log(newAccessToken);
            }
        }

        return Promise.reject(error)
    } 
)

const refreshAccesstoken = async(refreshToken)=>{
    try {
        const response = await Axios({
            ...summaryApi.refreshToken,
            headers : {
              Authorization : `Bearer ${refreshToken}`  
            }
        })
        const accessToken = response.data.data.accessToken
        localStorage.setItem("accessToken",accessToken)
        return accessToken
        
    } catch (error) {
        console.log(error);
    }
}



export default Axios 