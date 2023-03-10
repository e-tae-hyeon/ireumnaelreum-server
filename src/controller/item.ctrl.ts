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

export async function getItems(ctx: Context) {
  try {
    const { cursor } = <{ cursor: string }>ctx.query;
    const items = await itemService.getItems(parseInt(cursor, 10));

    ctx.body = items;
  } catch (err) {
    console.error(err);
  }
}

export async function getItem(ctx: Context) {
  try {
    const { id } = <{ id: string }>ctx.params;

    const item = await itemService.getItem(parseInt(id, 10));

    ctx.body = item;
  } catch (err) {
    console.error(err);
  }
}

export async function updateItem(ctx: Context) {
  try {
    const { userId } = ctx.state.user;
    const { id } = <{ id: string }>ctx.params;
    const { title, body } = <{ title: string; body: string }>ctx.request.body;

    await itemService.updateItem({
      userId,
      itemId: parseInt(id, 10),
      title,
      body,
    });

    ctx.state = 204;
    ctx.body = null;
  } catch (err) {
    console.error(err);
  }
}

export async function removeItem(ctx: Context) {
  try {
    const { userId } = ctx.state.user;
    const { id } = <{ id: string }>ctx.params;

    await itemService.removeItem(userId, parseInt(id, 10));

    ctx.status = 204;
    ctx.body = null;
  } catch (err) {}
}
