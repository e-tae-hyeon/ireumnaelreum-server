import { Context } from "koa";
import Router from "koa-router";

const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.body = ctx.state.user;
});

export default router;
