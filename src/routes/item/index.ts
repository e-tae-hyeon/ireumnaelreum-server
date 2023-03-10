import Router from "koa-router";
import * as ItemCtrl from "../../controller/item.ctrl";
import requireUser from "../../middlewares/requireUser";
import comment from "./comment";

const router = new Router();

router.use("/:id/comment", comment.routes());

router.post("/", requireUser, ItemCtrl.writeItem);
router.get("/", ItemCtrl.getItems);
router.get("/:id", ItemCtrl.getItem);
router.put("/:id", requireUser, ItemCtrl.updateItem);
router.delete("/:id", requireUser, ItemCtrl.removeItem);

export default router;
