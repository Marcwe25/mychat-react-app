import { loginURL, member_url } from "../../const/constsURL";
import { SET_MEMBER, SET_TOKENS } from "../reducers/authReducer";




export const FETCH_ARTICLE_DETAILS = "FETCH_ARTICLE_DETAILS";
export const SET_ARTICLE_DETAILS = "SET_ARTICLE_DETAILS";
export const AUTHENTICATE_USER = "AUTHENTICATE_USER";
export const FETCH_USER_DETAILS = "FETCH_USER_DETAILS";
export const REFRESH_TOKEN = "REFRESH_TOKEN";



export const API = "API";
export const API_START = "API_START";
export const API_END = "API_END";
export const ACCESS_DENIED = "ACCESS_DENIED";
export const API_ERROR = "API_ERROR";

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: API_ERROR,
  error
});


export function fetchArticleDetails() {
  return apiAction({
    url: "https://api.myjson.com/bins/19dtxc",
    onSuccess: setArticleDetails,
    onFailure: () => console.err("Error occured loading articles"),
    label: FETCH_ARTICLE_DETAILS
  });
}

function setArticleDetails(data) {
  return {
    type: SET_ARTICLE_DETAILS,
    payload: data
  };
}

export function authenticateUser(inputs) {
  return apiAction({
    url: loginURL,
    method: "POST",
    data:inputs,
    onSuccess: authenticationSuccess,
    label: AUTHENTICATE_USER
  });
}

function authenticationSuccess(data) {
  return {
    type: SET_TOKENS,
    payload: data
  };
}

export function fetchUserDetails() {
  return apiAction({
    url: member_url,
    onSuccess: setUserDetails,
    onFailure: () => console.err("Error occured fetchUserDetails"),
    label: FETCH_USER_DETAILS
  });
}

function setUserDetails(data) {
  return {
    type: SET_MEMBER,
    payload: data
  };
}

export function refreshTokens(refreshToken) {
  return apiAction({
    url: member_url,
    data: refreshToken,
    onSuccess: refreshTokenSuccess,
    onFailure: () => console.err("Error occured loading articles"),
    label: REFRESH_TOKEN
  });
}

function refreshTokenSuccess(data) {
  return {
    type: SET_TOKENS,
    payload: data
  };
}

function apiAction({
  url = "",
  method = "GET",
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  label = "",
  headersOverride = null
}) {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label,
      headersOverride
    }
  };
}

