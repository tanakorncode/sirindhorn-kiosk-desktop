import _ from "lodash";
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL || "http://sirindhorn.localhost";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    return _.get(response, "data", response);
  },
  function (error) {
    return Promise.reject(_.get(error, "response.data", error));
  }
);

export default axios;
