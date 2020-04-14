/*引入axios*/
import axios from "axios";
import store from "../store/store";
import router from "../router/index.js";
/*创建axios实例对象*/
const ajax = axios.create({
  // baseURL: 'http://116.62.71.25/', //正式地址
   baseURL: 'http://47.98.250.121/',
 //  baseURL: "http://192.168.1.192/",
  timeout: 5000
}); 
/*请求拦截器（请求之前的操作）*/
ajax.interceptors.request.use(
 
  config => {
    
      let token = JSON.parse(localStorage.getItem("publicInfo"));
 
      if (token!=null) {
        token = token.userInfo.token;
        // 判断是否存在token，如果存在的话，则每个http header都加上token
        config.headers.token = token;
      }
 
    return config;
  },
  /*错误操作*/
  err => {
    return Promise.reject(err);
  }
);
let Id = localStorage.getItem('Id');
if(this.Id == undefined || null){ 
  this.Id =  window.location.href.substr(window.location.href.length-9);
    // console.log('内',this.Id)
  }
/*请求之后的操作*/
ajax.interceptors.response.use(
  config => {
    if (config.data.code == 99) {
      // console.log("登陆失效了");
      router.push({
        path: `/page/log${Id}`
      });
    }
    return config;
  },
  err => {
    var originalRequest = err.config;
    if (
      err.code == "ECONNABORTED" &&
      err.message.indexOf("timeout") != -1 &&
      !originalRequest._retry
    ) {
      // console.log("请求超时");
      console.log(err);
      return service.request(originalRequest);
    } else {
      router.push({
        path: `/page/log${Id}`
      });
    }
    return service.request(originalRequest);
    return Promise.reject(err);
  }
);

/*导出模块*/
export default ajax;
