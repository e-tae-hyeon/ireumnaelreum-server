import { Context } from "koa";
import Router from "koa-router";
import requireUser from "../middlewares/requireUser";
import * as UserCtrl from "../controller/user.ctrl";

const router = new Router();

router.get("/", (ctx: Context) => {
  ctx.body = ctx.state.user;
});
router.put("/profile", requireUser, UserCtrl.updateProfile);
router.get("/item", requireUser, UserCtrl.getMyItems);

export default router;
