import axios from "axios";
import qs from "qs";
// import store from "@/store/index.js"
import Cookie from "js-cookie";
import {ToastPlugin} from 'vux'
import Vue from 'vue'
import { Toast } from 'vant'

Vue.use(ToastPlugin).use(Toast)

const config = require('../../config');
const isProduction = process.env.NODE_ENV === 'production';

if(process.env.NODE_ENV === 'development'){
     axios.defaults.baseURL = "http://admin.kacayu.net/";
}else{
    axios.defaults.baseURL = "http://admin.kacayu.net/";
}

axios.defaults.timeout = 5000;
axios.defaults.headers = {
    "Content-Type": "application/x-www-form-urlencoded",
};

// request全局拦截
axios.interceptors.request.use(config => {
    Toast.loading({
        forbidClick: true
    });
    return config
}, error => {
    return Promise.reject(error)
})

//response全局拦截
axios.interceptors.response.use(
    response => {
        Toast.clear()
        return response.data;
    },
    error => {
        Toast.clear()
        return Promise.reject(error);
    }
);

export const post = (url, params) => {
    return axios({
        method: "post",
        url: url,
        data: qs.stringify(params)
    });
};
export const get = (url, params) => {
    return axios({
        method: "get",
        url: url,
        params: params
    });
};
