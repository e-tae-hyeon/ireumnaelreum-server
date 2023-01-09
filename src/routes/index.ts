import Router from "koa-router";
import auth from "./auth";
import me from "./me";
import item from "./item";

const router = new Router();

router.use("/auth", auth.routes());
router.use("/me", me.routes());
router.use("/item", item.routes());

export default router;
