import db from "../utils/db";

export default class ItemService {
  async createItem(userId: number, { title, body }: CreateItemParam) {
    const item = await db.item.create({
      data: {
        userId,
        title,
        body,
      },
      include: {
        user: true,
      },
    });
    const itemStats = await db.itemStats.create({
      data: {
        itemId: item.id,
      },
    });

    return { ...item, itemStats };
  }
}

export type CreateItemParam = {
  title: string;
  body: string;
};
