import { Context } from "koa";
import { CLIENT_URL } from "../common/string";
import { getTokenKakao, getUserKakao } from "../utils/social/kakao";

export async function authByKakao(ctx: Context) {
  try {
    const { code } = <{ code: string }>ctx.query;

    const token = await getTokenKakao(code);
    const user = await getUserKakao(token);

    console.log(user);

    ctx.status = 204;
    ctx.redirect(CLIENT_URL);
  } catch (err) {
    console.error(err);
  }
}
