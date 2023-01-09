import { Context } from "koa";
import ItemService from "../services/item.svc";
import Joi from "joi";

const itemService = new ItemService();

export async function writeItem(ctx: Context) {
  try {
    const schema = Joi.object<{ title: string; body: string }>({
      title: Joi.string().required(),
      body: Joi.string().required(),
    });
    const { error, value } = schema.validate(ctx.request.body);
    if (error) throw new Error("Body invalidate");

    const { userId } = ctx.state.user;

    const item = await itemService.createItem(userId, value);

    ctx.body = item;
  } catch (err) {
    console.error(err);
  }
}
