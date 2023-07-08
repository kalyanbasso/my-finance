import { AxiosAdapter } from "./AxiosAdapter";

describe("AxiosAdapter", () => {
  const adapter = new AxiosAdapter("http://localhost:3000");
  it("should be defined", () => {
    expect(adapter).toBeDefined();
  });

  it("should return axios", () => {
    expect(adapter.getAxios).toBeDefined();
  });

  it("should return getApi", () => {
    expect(adapter.getApi).toBeDefined();
  });

  it("should return postApi", () => {
    expect(adapter.postApi).toBeDefined();
  });

  it("should return putApi", () => {
    expect(adapter.putApi).toBeDefined();
  });

  it("should return deleteApi", () => {
    expect(adapter.deleteApi).toBeDefined();
  });
});
