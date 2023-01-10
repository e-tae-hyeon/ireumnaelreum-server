import { Context } from "koa";
import CommentService from "../services/comment.svc";

const commentService = new CommentService();

export async function writeComment(ctx: Context) {
  try {
    const { userId } = ctx.state.user;
    const { id } = <{ id: string }>ctx.params;
    const { text } = <{ text: string }>ctx.request.body;

    const comment = await commentService.createComment({
      userId,
      itemId: parseInt(id, 10),
      text,
    });

    ctx.body = comment;
  } catch (err) {
    console.error(err);
  }
}

export async function getComments(ctx: Context) {
  try {
    const { userId } = ctx.state.user;
    const { id } = <{ id: string }>ctx.params;

    const comments = await commentService.getComments({
      itemId: parseInt(id, 10),
      userId,
    });

    ctx.body = comments;
  } catch (err) {
    console.error(err);
  }
}
