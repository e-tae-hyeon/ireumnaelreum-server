import Router from "koa-router";
import * as AuthCtrl from "../controller/auth.ctrl";
import requireUser from "../middlewares/requireUser";

const router = new Router();

router.get("/callback/kakao", AuthCtrl.authByKakao);
router.delete("/logout", AuthCtrl.logout);
router.delete("/", requireUser, AuthCtrl.unregister);

export default router;
