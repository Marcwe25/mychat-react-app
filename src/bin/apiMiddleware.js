// inspired by https://leanpub.com/redux-book
import axios from "axios";
import { API, AUTHENTICATE_USER } from "./actionCreators/apiActions";
import { accessDenied, apiError, apiStart, apiEnd } from "./actionCreators/apiActions";
import {loginURL,apiURL,member_url} from '../const/constsURL'

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  
  next(action);
  if (action.type !== API) return;


  const {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label,
    headers
  } = action.payload;
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  const state = getState()
  const accessToken = getState().userData?.accessToken

  // axios default configs
  axios.defaults.baseURL = apiURL;
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["withCredentials"] = "true";

  if(accessToken) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }


  if(label !==AUTHENTICATE_USER){
  axios.interceptors.response.use(
    response => {
        return response
    },
    async (error) => {   
        const prevRequest = error?.config
        if (error?.response?.status === 401 && !prevRequest.sent) {
            prevRequest.sent = true
            await dispatch(postRefreshToken())
            // prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

            return axios(prevRequest);
        }
        return Promise.reject(error);
    }
);


    // axios.interceptors.request.use(
    //     (config) => {
    //         const accessToken = localStorage.getItem('access_token')
    //         return {
    //         ...config,
    //         headers: {
    //             ...(accessToken !== null && { Authorization: `Bearer ${accessToken}` }),
    //             ...config.headers,
    //         },
    //         };
    //     }, (error) => Promise.reject(error)
    // );
  }

  if (label) {
    
    dispatch(apiStart(label));
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      dispatch(onSuccess(data));
    })
    .catch(error => {
      dispatch(apiError(error));
      dispatch(onFailure(error));

      if (error.response && error.response.status === 403) {
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;