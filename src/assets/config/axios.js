import axios from "axios";
import { config } from "./config";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

let accessToken = null;

// Listen for authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    console.log("User signed in:", user);
    accessToken = user.accessToken;
  } else {
    // No user is signed in
    console.log("No user signed in");
    accessToken = null;
  }
});

const instance = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    SameSite: "None",
  },
  mode: "no-cors",
  baseURL: config.backEndURL,
  timeout: 600000000,
  responseType: "json",
  validateStatus: function (status) {
    return status < 500;
  },
  // withCredentials: true,
});

// Add a request interceptor to include the accessToken in the request header
instance.interceptors.request.use(
  function (config) {
    // Add the accessToken to the Authorization header
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lies within the range of 2xx causes this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that fall outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);
  }
);

export default instance;
