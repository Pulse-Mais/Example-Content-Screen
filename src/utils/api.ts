import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_MY_SECRET_KEY,
});


export {
    api
};