import axios from "axios";
const BASE_URL = "https://lifesource.onrender.com/api/v1"  //"http://localhost:8000/api/v1";

export const publicRequest = axios.create({
    baseURL: BASE_URL
})

export const userRequest = axios.create({
    
    baseURL: BASE_URL
})