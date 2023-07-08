import { HttpClient } from "./HttpClient";
import { AxiosAdapter } from "./AxiosAdapter";

jest.mock("./AxiosAdapter");

describe("HttpClient", () => {
    let httpClient: HttpClient;
    let axiosAdapter: AxiosAdapter;

    beforeEach(() => {
        axiosAdapter = new AxiosAdapter('http://localhost:3000');
        httpClient = new HttpClient(axiosAdapter);
    })

    afterEach(() => {
        jest.clearAllMocks();
    })

    describe("get", () => {
        it("should be defined", () => {
            expect(httpClient.get).toBeDefined();
        })
        // it("should call getApi", async () => {
        //     const mockResponse = { data: { id: 1, name: "John Doe" } };
        //     const getApiSpy = jest.spyOn(axiosAdapter, "getApi").mockResolvedValue(mockResponse);


        //     const response = await httpClient.get("/users");

        //     expect(axiosAdapter.getApi).toHaveBeenCalledTimes(1);
        //     expect(axiosAdapter.getApi).toHaveBeenCalledWith("/users");
        //     expect(response).toEqual(mockResponse.data);
        // })
    })

})