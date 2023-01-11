import { Context, Next } from "koa";
import AuthService from "../services/auth.svc";
import { setTokenCookie } from "../utils/cookies";
import { AccessTokenPayload, validateToken } from "../utils/token";

const authService = new AuthService();

export default async function checkUser(ctx: Context, next: Next) {
  try {
    const accessToken =
      ctx.cookies.get("access_token") ??
      ctx.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) throw new Error("No access token");

    const decoded = await validateToken<AccessTokenPayload>(accessToken);

    ctx.state.user = { userId: decoded.userId };
  } catch (err) {
    const refreshToken = ctx.cookies.get("refresh_token");
    if (!refreshToken) return next();
    try {
      const tokens = await authService.refreshToken(refreshToken);

      setTokenCookie(ctx, tokens);
      const decoded = await validateToken<AccessTokenPayload>(
        tokens.refreshToken
      );

      ctx.state.user = { userId: decoded.userId };
    } catch (e) {}
  }

  return next();
}
