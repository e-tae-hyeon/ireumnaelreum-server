import Router from "koa-router";
import * as CommentCtrl from "../../../controller/comment.ctrl";
import requireUser from "../../../middlewares/requireUser";

const router = new Router();

router.post("/", requireUser, CommentCtrl.writeComment);
router.get("/", CommentCtrl.getComments);

export default router;
