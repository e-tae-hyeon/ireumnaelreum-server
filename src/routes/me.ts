import { Context } from "koa";
import Router from "koa-router";
import checkUser from "../middlewares/checkUser";

const router = new Router();

router.get("/", checkUser, (ctx: Context) => {
  ctx.body = ctx.state.user;
});

export default router;
