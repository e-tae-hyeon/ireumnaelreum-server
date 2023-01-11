import { Context } from "koa";
import UserService from "../services/user.svc";

const userService = new UserService();

export async function updateProfile(ctx: Context) {
  try {
    const { userId } = ctx.state.user;
    const { nickname } = <{ nickname: string }>ctx.request.body;

    await userService.updateProfile({ userId, nickname });

    ctx.status = 204;
    ctx.body = null;
  } catch (err) {
    console.error(err);
  }
}
