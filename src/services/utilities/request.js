import axios from "axios";

axios.defaults.baseURL = `${process.env.REACT_APP_BASE_URL}`;

const request = ({ url, type = "GET", data, headers = {} }) => {
  return axios({ url, method: type, data, headers });
};

export default request;
