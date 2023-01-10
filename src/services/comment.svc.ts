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

  async getComments({
    itemId,
    userId = null,
  }: {
    itemId: number;
    userId?: number | null;
  }) {
    const comments = await db.comment.findMany({
      where: {
        itemId,
      },
      orderBy: {
        id: "asc",
      },
      include: {
        user: {
          include: {
            Profile: true,
          },
        },
      },
    });

    const commentsLikedMap = userId
      ? await this.getCommentLikedMap({
          commentIds: comments.map((C) => C.id),
          userId,
        })
      : {};

    const commentsWithIsLiked = comments.map((C) => ({
      ...C,
      isLiked: !!commentsLikedMap[C.id],
    }));

    return commentsWithIsLiked;
  }

  async getCommentLikedMap({
    commentIds,
    userId,
  }: {
    commentIds: number[];
    userId: number;
  }) {
    const list = await db.commentLike.findMany({
      where: {
        userId,
        commentId: {
          in: commentIds,
        },
      },
    });

    return list.reduce((acc, cur) => {
      acc[cur.commentId] = cur;
      return acc;
    }, {});
  }
}

export type CreateCommentParam = {
  userId: number;
  itemId: number;
  text: string;
};
