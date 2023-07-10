import { AxiosAdapter } from "./AxiosAdapter";
import constants from "./constants";

export class HttpClient {
  constructor(private readonly adapterApi = new AxiosAdapter(constants.API_URL)) {}

  async get<T>(url: string) {
    const getApi = this.adapterApi.getApi;
    const response = await getApi<T>(url);
    return response.data;
  }

  async post<T>(url: string, data: any) {
    const postApi = this.adapterApi.postApi;
    const response = await postApi<T>(url, data);
    return response.data;
  }

  async put<T>(url: string, data: any) {
    const putApi = this.adapterApi.putApi;
    const response = await putApi<T>(url, data);
    return response.data;
  }

  async delete<T>(url: string) {
    const deleteApi = this.adapterApi.deleteApi;
    const response = await deleteApi<T>(url);
    return response.data;
  }
}
