import { Context, Next } from "koa";
import { AccessTokenPayload, validateToken } from "../utils/token";

export default async function checkUser(ctx: Context, next: Next) {
  const accessToken =
    ctx.cookies.get("access_token") ??
    ctx.headers.authorization?.split("Bearer ")[1];

  if (!accessToken) return next();

  const decoded = await validateToken<AccessTokenPayload>(accessToken);

  ctx.state.user = { userId: decoded.userId };

  return next();
}
