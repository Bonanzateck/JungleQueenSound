import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

class ApiService {
  public baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Add interceptors
    axios.interceptors.request.use(this.handleRequestInterception);
    axios.interceptors.response.use(
      this.handleResponseInterception,
      this.handleResponseErrorInterception
    );
  }

  get(resource: string, params: object = {}, responseType?: any): Promise<AxiosResponse<any>> {
    return axios.get(resource, { params, responseType });
  }

  post(resource: string, body: object = {}, headers: object = {}): Promise<AxiosResponse<any>> {
    return axios.post(resource, body,headers);
  }

  put(resource: string, body: object = {}): Promise<AxiosResponse<any>> {
    return axios.put(resource, body);
  }

  patch(resource: string, body: object = {}): Promise<AxiosResponse<any>> {
    return axios.patch(resource, body);
  }

  del(resource: string, params: object = {}): Promise<AxiosResponse<any>> {
    return axios.delete(resource, { params });
  }

  private handleRequestInterception(config: AxiosRequestConfig): AxiosRequestConfig {
    return config;
  }

  private handleResponseInterception(response: AxiosResponse<any>): AxiosResponse<any> {
    return response;
  }

  private handleResponseErrorInterception({ response }: any): Promise<any> {
    throw { error: response };
  }
}

export default ApiService;
