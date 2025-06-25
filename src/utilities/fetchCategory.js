
import summaryApi from "../common/CommonApi";
import Axios from "./axios";

import AxiosToastError from "../common/AxiosToastError";

const fetchCategory = async () => {
  try {
    const { data } = await Axios({
      ...summaryApi.getCategory,
    });
    return data.data
  } catch (error) {
    AxiosToastError(error);
  }
};

export default fetchCategory


