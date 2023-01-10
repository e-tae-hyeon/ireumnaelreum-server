import Router from "koa-router";
import * as ItemCtrl from "../controller/item.ctrl";
import requireUser from "../middlewares/requireUser";

const router = new Router();

router.post("/", requireUser, ItemCtrl.writeItem);
router.get("/", ItemCtrl.getItems);
router.get("/:id", ItemCtrl.getItem);

export default router;
