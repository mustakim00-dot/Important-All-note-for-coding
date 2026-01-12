import axios from "axios";


export const api =  axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { accept: "application/json", "content-type": "application/json" },
    // timeout: 2000,
});
