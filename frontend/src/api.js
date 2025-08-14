import axios from "axios";

export const API = axios.create({
   baseURL: "http://localhost:3000/api",
    //baseURL: "https://eventmanagement-60yw.onrender.com/api",
});
