import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

export class ApiService {

  axiosInstance: AxiosInstance;

  constructor() {
    // Init axiosInstance
    this.axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3002',
      // Common header
      headers: {
        'Content-Type': 'application/json',
        'pragma': 'no-cache',
        'cache-control': 'no-cache',
        ...this.getTokenHeader()
      }
    });
    this._setInterceptors();
  }

  getTokenHeader() {
    let headersAuth = {};
    const token = localStorage.getItem('accessToken')
    if (token) {
      headersAuth = { 'x-authorization': `${token}` };
    }
    return headersAuth;
  }

  createURL(uri: (string | object)[]) {
    let paramsUrl: any;
    if (typeof uri[uri.length - 1] !== 'string') {
      paramsUrl = uri.pop();
      let url = uri.join('/');
      Object.keys(paramsUrl).forEach(x => {
        url = url.replace(`:${x}`, paramsUrl[x]);
      });
      return url;
    } else {
      return uri.join('/');
    }
  }

  get(uri: (string | object)[], params = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.get(this.createURL(uri), { params, ...moreConfigs });
      this._handleRespond(request, resolve, reject);
    });
  }

  post(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.post(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  put(uri: (string | object)[], data = {}, moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.put(this.createURL(uri), data, moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  delete(uri: (string | object)[], moreConfigs = {}) {
    return new Promise((resolve, reject) => {
      const request = this.axiosInstance.delete(this.createURL(uri), moreConfigs);
      this._handleRespond(request, resolve, reject);
    });
  }

  multipeGets(apiRequests: any) {
    const apiReqs = apiRequests.map((v: any) =>
      this.axiosInstance.get(v),
    );
    return new Promise((resolve, reject) => {
      axios.all(apiReqs)
        .then((resp: any) => {
          resolve(resp.map((v: any) => v.data));
        })
        .catch((err: any) => reject(err));
    });
  }

  private _handleRespond(request: any, resolve: any, reject: any) {
    return request.then((resp: AxiosResponse) => {
      resolve(resp.data);
    }).catch((err: any) => {
      reject(err);
    });
  }

  private _setInterceptors() {
    this.axiosInstance.interceptors.request.use(
      (request: any) => {
        const token = localStorage.getItem('accessToken')
        if (token) {
          Object.assign(request.headers, { 'x-authorization': `${token}` });
        }
        return request;
      },
    );
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => this._handleError(error)
    );
  }

  private async _handleError(error: AxiosError) {
    // Make error model before promise
    if (error.isAxiosError && error.response) {
      // Axios error
      return Promise.reject(error);
    } else {
      // Default | Network errors | CORS | ...
      return Promise.reject({});
    }
  }
}
