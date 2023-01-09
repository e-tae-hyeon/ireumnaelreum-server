import { Context, Next } from "koa";

export default async function requireUser(ctx: Context, next: Next) {
  try {
    const user = ctx.state.user;

    if (!user) throw new Error("Not authorized");

    return next();
  } catch (err) {
    console.error(err);
  }
}
