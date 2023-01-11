import { Context } from "koa";

export function setTokenCookie(
  ctx: Context,
  tokens: { accessToken: string; refreshToken: string }
) {
  ctx.cookies.set("access_token", tokens.accessToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 3,
  });

  ctx.cookies.set("refresh_token", tokens.refreshToken, {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30,
  });
}

export function clearTokenCookie(ctx: Context) {
  ctx.cookies.set("access_token", "", {
    maxAge: 0,
  });

  ctx.cookies.set("refresh_token", "", {
    maxAge: 0,
  });
}
