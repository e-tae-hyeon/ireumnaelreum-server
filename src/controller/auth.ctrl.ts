import { Context } from "koa";
import { CLIENT_URL } from "../common/string";
import AuthService from "../services/auth.svc";
import { setTokenCookie } from "../utils/cookies";
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
