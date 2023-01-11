import { Context } from "koa";
import { CLIENT_URL } from "../common/string";
import AuthService from "../services/auth.svc";
import { clearTokenCookie, setTokenCookie } from "../utils/cookies";
import { getTokenKakao, getUserKakao } from "../utils/social/kakao";

const authService = new AuthService();

export async function authByKakao(ctx: Context) {
  try {
    const { code } = <{ code: string }>ctx.query;

    const token = await getTokenKakao(code);
    const user = await getUserKakao(token);

    const authResult = await authService.authBySocial(
      "KAKAO",
      user.id.toString()
    );

    setTokenCookie(ctx, authResult.tokens);

    ctx.status = 204;
    ctx.redirect(CLIENT_URL);
  } catch (err) {
    console.error(err);
  }
}

export async function logout(ctx: Context) {
  try {
    clearTokenCookie(ctx);

    ctx.status = 204;
    ctx.body = null;
  } catch (err) {
    console.error(err);
  }
}

export async function unregister(ctx: Context) {
  try {
    const { userId } = ctx.state.user;

    await authService.removeUser(userId);

    clearTokenCookie(ctx);

    ctx.status = 204;
    ctx.body = null;
  } catch (err) {
    console.error(err);
  }
}
