import { Provider, Token } from "@prisma/client";
import db from "../utils/db";
import {
  generateToken,
  RefreshTokenPayload,
  validateToken,
} from "../utils/token";

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
        Profile: {
          create: {
            nickname: "낼름이",
          },
        },
      },
    });

    const tokens = await this.generateTokens(newUser.id);

    return { user: newUser, tokens };
  }

  async removeUser(userId: number) {
    await db.user.delete({
      where: {
        id: userId,
      },
    });
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

  async refreshToken(token: string) {
    const { tokenId, rotationCounter } =
      await validateToken<RefreshTokenPayload>(token);
    const tokenItem = await db.token.findUnique({
      where: {
        id: tokenId,
      },
      include: {
        user: true,
      },
    });

    if (!tokenItem) throw new Error("Token not found");
    if (tokenItem.blocked) throw new Error("Token is blocked");
    if (tokenItem.rotationCounter !== rotationCounter) {
      await db.token.update({
        where: {
          id: tokenId,
        },
        data: {
          blocked: true,
        },
      });
      throw new Error("Rotation counter does not match");
    }

    tokenItem.rotationCounter += 1;
    await db.token.update({
      where: {
        id: tokenId,
      },
      data: {
        rotationCounter: tokenItem.rotationCounter,
      },
    });

    return this.generateTokens(tokenItem.userId, tokenItem);
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
