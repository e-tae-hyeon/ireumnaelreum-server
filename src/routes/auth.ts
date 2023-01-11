import Router from "koa-router";
import * as AuthCtrl from "../controller/auth.ctrl";

const router = new Router();

router.get("/callback/kakao", AuthCtrl.authByKakao);
router.delete("/logout", AuthCtrl.logout);

export default router;
