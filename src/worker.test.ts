import { unstable_dev, Unstable_DevWorker } from "wrangler";
import { FormData } from "undici";

let worker: Unstable_DevWorker;

describe("example", () => {
  beforeAll(async () => {
    worker = await unstable_dev("src/worker.ts", { config: "wrangler.toml" });
  });

  afterAll(async () => {
    await worker.stop();
  });

  it("GET 200 is fine", async () => {
    const response = await worker.fetch(`/ok`, { method: "GET" });
    expect(response.status).toStrictEqual(200);
  });

  it("GET 401 is fine", async () => {
    const response = await worker.fetch(`/error`, { method: "GET" });
    expect(response.status).toStrictEqual(401);
  });

  it("PUT 200 is fine", async () => {
    const response = await worker.fetch(`/ok`, {
      method: "PUT",
      body: "Hello body",
    });
    expect(response.status).toStrictEqual(200);
  });

  it("PUT 401 is fine (string)", async () => {
    const response = await worker.fetch(`/error`, {
      method: "PUT",
      body: "Hello body",
    });
    expect(response.status).toStrictEqual(401);
  });

  it("PUT 401 is fine (json string)", async () => {
    const response = await worker.fetch(`/error`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ hello: "world" }),
    });
    expect(response.status).toStrictEqual(401);
  });

  it("PUT 401 is fine (form data)", async () => {
    const formData = new FormData();
    formData.append("field", "42");

    const response = await worker.fetch(`/error`, {
      method: "PUT",
      body: formData,
    });
    expect(response.status).toStrictEqual(401);
  });
});
