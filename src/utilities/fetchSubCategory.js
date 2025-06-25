import summaryApi from "../common/CommonApi";
import Axios from "./axios";

import AxiosToastError from "../common/AxiosToastError";

const fetchSubCategory = async () => {
  try {
    const { data } = await Axios({
      ...summaryApi.getSubCategory,
    });
    return data.data;
  } catch (error) {
    AxiosToastError(error);
  }
};

export default fetchSubCategory;
