/*
 * @Author: Vinton
 * @Date: 2022-03-11 15:22:17
 * @Description: file content
 */
import axios, { AxiosResponse } from "axios";
import { showMessage } from "./error-code-type"; // 引入状态码文件

// 设置接口超时时间
axios.defaults.timeout = 60000;

// 请求地址，这里是动态赋值的的环境变量，下一篇会细讲，这里跳过
// @ts-ignore
// axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_API;

//http request 拦截器
axios.interceptors.request.use(
  (config) => {
    // 配置请求头
    config.headers = {
      //'Content-Type':'application/x-www-form-urlencoded',   // 传参方式表单
      "Content-Type": "application/json;charset=UTF-8", // 传参方式json
      token: "80c483d59ca86ad0393cf8a98416e2a1", // 这里自定义配置，这里传的是token
    };
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//http response 拦截器
axios.interceptors.response.use(
  (response) => {
    // 这边还可以做一写请求状态码的拦截操作
    if (response.status === 200) {
      // FIXME: axios 的拦截器怎么添加 ts 的类型支持？等下研究下。
      // return response.data;
      return response;
    }
  },
  (error) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      showMessage(response.status); // 传入响应码，匹配响应码对应信息
      return Promise.reject(response.data);
    }
    // ElMessage.warning("网络连接异常,请稍后再试!");
  }
);

// 封装 GET POST 请求并导出
export function request<T>(
  url = "",
  params = {},
  type = "POST"
): Promise<AxiosResponse<T>> {
  //设置 url params type 的默认值
  return new Promise((resolve, reject) => {
    let promise;
    if (type.toUpperCase() === "GET") {
      promise = axios({
        url,
        params,
      });
    } else if (type.toUpperCase() === "POST") {
      promise = axios({
        method: "POST",
        url,
        data: params,
      });
    }
    //处理返回
    promise
      ?.then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
