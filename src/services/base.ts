import { HttpClient } from "../infra/HttpClient";

export default async function base() {
    await del()
}

async function get() {
  try {
    const httpClient = new HttpClient();
    const response = await httpClient.get("transaction");
  } catch (error) {
    throw new Error("Error to get");
  }
}

async function post() {
  try {
    const httpClient = new HttpClient();
    const body = {
        createdAt: new Date(),
        category: "teste",
        name: "teste",
        amount: 100,
    };
    const response = await httpClient.post("transaction", body);
  } catch (error) {
    throw new Error("Error to post");
  }
}

async function put() {
  try {
    const httpClient = new HttpClient();
    const body = {
        createdAt: new Date(),
        category: "teste1",
        name: "teste23",
        amount: 100,
    };
    const response = await httpClient.put("transaction/1", body);
  } catch (error) {
    throw new Error("Error to put");
  }
}

async function del() {
  try {
    const httpClient = new HttpClient();
    const response = await httpClient.delete("transaction/1");
  } catch (error) {
    throw new Error("Error to delete");
  }
}
