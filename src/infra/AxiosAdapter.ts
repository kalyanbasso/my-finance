import axios, { Axios } from "axios";
import { IAdapterApi } from "./interfacesAdapterApi";

export class AxiosAdapter implements IAdapterApi {
  private readonly api: Axios;

  constructor(private readonly baseUrl: string) {
    this.api = axios.create({
      baseURL: this.baseUrl,
    });
  }

  get getAxios() {
    return this.api;
  }

  get getApi() {
    return this.api.get;
  }

  get postApi() {
    return this.api.post;
  }

  get putApi() {
    return this.api.put;
  }

  get deleteApi() {
    return this.api.delete;
  }
}
