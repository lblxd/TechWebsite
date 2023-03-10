import axios from "axios";
import Vue from "vue";
import router from './router'
const http = axios.create({
  baseURL: "http://localhost:3000/web/api",
});

http.interceptors.request.use(
  function (config) {
    if(localStorage.token){
      config.headers.Authorization = 'Bearer ' + (localStorage.token || "")
    }
   //当前端发起axios请求时会带一个token在请求头中
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);


http.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.data.message) {
      Vue.prototype.$message({
        type: "error",
        message: err.response.data.message,
      });
      if(err.response.status == 401){
        router.push('/login')
      }
    }

    return Promise.reject(err);
  }
);
 
export default http;
