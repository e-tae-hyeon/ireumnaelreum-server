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
        user: {
          include: {
            Profile: true,
          },
        },
      },
    });
    const itemStats = await db.itemStats.create({
      data: {
        itemId: item.id,
      },
    });

    return { ...item, itemStats };
  }

  async getItems(cursor: number) {
    const items = await db.item.findMany({
      take: 15,
      skip: cursor ? 1 : 0,
      ...(cursor && { cursor: { id: cursor } }),
      orderBy: { createdAt: "desc" },
      include: {
        user: {
          include: {
            Profile: true,
          },
        },
        ItemStats: true,
      },
    });
    const endCursor = items.at(-1)?.id ?? null;
    const hasNextPage = endCursor
      ? (await db.item.count({
          where: {
            id: { lt: endCursor },
          },
          orderBy: { id: "desc" },
        })) > 0
      : false;

    return { items, pageInfo: { endCursor, hasNextPage } };
  }
}

export type CreateItemParam = {
  title: string;
  body: string;
};
