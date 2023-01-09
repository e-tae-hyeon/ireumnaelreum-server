import Router from "koa-router";
import * as ItemCtrl from "../controller/item.ctrl";
import requireUser from "../middlewares/requireUser";

const router = new Router();

router.post("/", requireUser, ItemCtrl.writeItem);

export default router;
