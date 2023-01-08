import Router from "koa-router";
import * as AuthCtrl from "../controller/auth.ctrl";

const router = new Router();

router.get("/callback/kakao", AuthCtrl.authByKakao);

export default router;
