import Koa, { Context } from "koa";
import KoaLogger from "koa-logger";
import dotenv from "dotenv";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import cors from "@koa/cors";

dotenv.config();
const app = new Koa();
const router = new Router();

app.use(
  cors({
    origin: (ctx: Context): any => {
      const whiteList = ["http://localhost:3000"];
      if (whiteList.indexOf(ctx.request.header.origin as string) !== -1) {
        return ctx.request.header.origin;
      }
      return whiteList[0];
    },
    credentials: true,
  })
);
app.use(bodyParser());
app.use(KoaLogger());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => console.log("server is running"));
