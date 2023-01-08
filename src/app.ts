import Koa from "koa";
import KoaLogger from "koa-logger";
import dotenv from "dotenv";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";

dotenv.config();
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(KoaLogger());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => console.log("server is running"));
