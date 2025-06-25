
import summaryApi from "../common/CommonApi";
import Axios from "./axios";



const UploadImage =async(image) => {
    try {
        const formData = new FormData();
        formData.append("image",image)
        const response = await Axios({
            ...summaryApi.uploadImage,
            data : formData
        })
        return response

    } catch (error) {
       return error
    }
};

export default UploadImage;