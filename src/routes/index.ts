import Router from "koa-router";
import auth from "./auth";
import me from "./me";

const router = new Router();

router.use("/auth", auth.routes());
router.use("/me", me.routes());

export default router;
