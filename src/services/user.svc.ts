import db from "../utils/db";

export default class UserService {
  async updateProfile(param: UpdateProfileParam) {
    const { userId, nickname } = param;

    await db.profile.update({
      where: {
        userId,
      },
      data: {
        nickname,
      },
    });
  }

  async getWrittenItems(userId: number) {
    const items = await db.item.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          include: {
            Profile: true,
          },
        },
        ItemStats: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return items;
  }
}

type UpdateProfileParam = {
  userId: number;
  nickname: string;
};
