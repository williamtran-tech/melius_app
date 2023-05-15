import axios from "axios";
const axiosServer1 = axios.create({
    baseURL: 'https://dog.ceo/',
    // You can also add other custom configurations for this server
  });
const ApiHandler={
    axiosServer1
};
export default ApiHandler