import JWT from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET ?? "jwt_secret";

const tokenDuration = {
  access_token: "3h",
  refresh_token: "30d",
};

export function generateToken(payload: TokenPayload) {
  return new Promise<string>((resolve, reject) => {
    JWT.sign(
      payload,
      SECRET,
      {
        expiresIn: tokenDuration[payload.type],
      },
      (err, token) => {
        if (err || !token) return reject(err);
        resolve(token);
      }
    );
  });
}

export function validateToken<T>(token: string) {
  return new Promise<DecodedToken<T>>((resolve, reject) => {
    JWT.verify(token, SECRET, (err, decoded) => {
      if (err) return reject(err);
      resolve(decoded as DecodedToken<T>);
    });
  });
}

type DecodedToken<T> = T & {
  iat: number;
  exp: number;
};

export type AccessTokenPayload = {
  type: "access_token";
  userId: number;
};

export type RefreshTokenPayload = {
  type: "refresh_token";
  tokenId: number;
  rotationCounter: number;
};

type TokenPayload = AccessTokenPayload | RefreshTokenPayload;
