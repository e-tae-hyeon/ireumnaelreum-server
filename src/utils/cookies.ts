import { Context } from "koa";

const domains = [".ireumnaelreum.vercel.app", undefined];

export function setTokenCookie(
  ctx: Context,
  tokens: { accessToken: string; refreshToken: string }
) {
  domains.forEach((domain) => {
    ctx.cookies.set("access_token", tokens.accessToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 3,
      domain,
    });

    ctx.cookies.set("refresh_token", tokens.refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 30,
      domain,
    });
  });
}

export function clearTokenCookie(ctx: Context) {
  domains.forEach((domain) => {
    ctx.cookies.set("access_token", "", {
      maxAge: 0,
      domain,
    });

    ctx.cookies.set("refresh_token", "", {
      maxAge: 0,
      domain,
    });
  });
}
