import { Provider, Token } from "@prisma/client";
import db from "../utils/db";
import { generateToken } from "../utils/token";

export default class AuthService {
  async authBySocial(provider: Provider, id: string) {
    const exists = await db.socialAccount.findUnique({
      where: {
        id_provider: { id, provider },
      },
    });
    if (exists) {
      const tokens = await this.generateTokens(exists.userId);
      return {
        user: exists,
        tokens,
      };
    }

    const newUser = await db.user.create({
      data: {
        socialAccount: {
          create: {
            provider,
            id,
          },
        },
      },
    });

    const tokens = await this.generateTokens(newUser.id);

    return { user: newUser, tokens };
  }

  async generateTokens(userId: number, tokenItem?: Token) {
    const token = tokenItem ?? (await this.createTokenItem(userId));

    const accessToken = await generateToken({
      type: "access_token",
      userId,
    });
    const refreshToken = await generateToken({
      type: "refresh_token",
      tokenId: token.id,
      rotationCounter: token.rotationCounter,
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async createTokenItem(userId: number) {
    const token = await db.token.create({
      data: {
        userId,
      },
    });
    return token;
  }
}
