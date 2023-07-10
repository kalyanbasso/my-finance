import { HttpClient } from "./HttpClient";
import { AxiosAdapter } from "./AxiosAdapter";

jest.mock("./AxiosAdapter");

describe("HttpClient", () => {
  let httpClient: HttpClient;
  let axiosAdapter: AxiosAdapter;

  beforeEach(() => {
    axiosAdapter = new AxiosAdapter("http://localhost:3000");

    // @ts-ignore
    axiosAdapter = {
      getApi: jest.fn().mockResolvedValue({ data: {} }),
      postApi: jest.fn().mockResolvedValue({ data: {} }),
      putApi: jest.fn().mockResolvedValue({ data: {} }),
      deleteApi: jest.fn().mockResolvedValue({ data: {} })
    };
    httpClient = new HttpClient(axiosAdapter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("get", () => {
    it("should be defined", () => {
      expect(httpClient.get).toBeDefined();
    });
    it("should call getApi", async () => {
      const getApiMock = jest.spyOn(axiosAdapter, "getApi");
      await httpClient.get("/test");
      expect(getApiMock).toHaveBeenCalledWith("/test");
    });
  });

  describe("post", () => {
    it("should be defined", () => {
      expect(httpClient.post).toBeDefined();
    });
    it("should call postApi", async () => {
      const postApiMock = jest.spyOn(axiosAdapter, "postApi");
      await httpClient.post("/test", {});
      expect(postApiMock).toHaveBeenCalledWith("/test", {});
    });
  });

  describe("put", () => {
    it("should be defined", () => {
      expect(httpClient.put).toBeDefined();
    });
    it("should call putApi", async () => {
      const putApiMock = jest.spyOn(axiosAdapter, "putApi");
      await httpClient.put("/test", {});
      expect(putApiMock).toHaveBeenCalledWith("/test", {});
    });
  });

  describe("delete", () => {
    it("should be defined", () => {
      expect(httpClient.delete).toBeDefined();
    });
    it("should call deleteApi", async () => {
      const deleteApiMock = jest.spyOn(axiosAdapter, "deleteApi");
      await httpClient.delete("/test");
      expect(deleteApiMock).toHaveBeenCalledWith("/test");
    });
  });
});
