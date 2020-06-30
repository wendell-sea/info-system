import Vue from 'vue';
import axios from 'axios';



const http = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        'Content-type': 'application/json'
    }
});

// 添加请求拦截器
axios.interceptors.request.use((config) => {

    // 在发送请求之前做些什么
    // 获取token
    let token = window.sessionStorage.getItem('token')
    if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.authorization = token //请求头加上token
    }

    return config;
}, function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
axios.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response;
}, function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default http