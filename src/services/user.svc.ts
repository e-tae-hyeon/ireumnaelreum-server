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
}

type UpdateProfileParam = {
  userId: number;
  nickname: string;
};
