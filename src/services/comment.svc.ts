import db from "../utils/db";

export default class CommentService {
  async createComment(param: CreateCommentParam) {
    const { userId, itemId, text } = param;

    const comment = await db.comment.create({
      data: {
        userId,
        itemId,
        text,
      },
    });

    return comment;
  }
}

export type CreateCommentParam = {
  userId: number;
  itemId: number;
  text: string;
};
