import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.all("/ok", (ctx) => {
  return ctx.body(null, 200);
});

app.all("/error", () => {
  throw new HTTPException(401);
});

export default app;
