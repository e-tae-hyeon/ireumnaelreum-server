import axios from "axios";

export async function getTokenKakao(code: string) {
  const params = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_CLIENT_ID,
    redirect_uri: process.env.END_POINT + "/api/auth/callback/kakao",
    code,
    client_secret: process.env.KAKAO_CLIENT_SECRET,
  };

  const res = await axios.post<{ access_token: string }>(
    "https://kauth.kakao.com/oauth/token",
    null,
    {
      params,
    }
  );

  return res.data.access_token;
}

export async function getUserKakao(accessToken: string) {
  const res = await axios.get<{
    id: number;
  }>("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return res.data;
}
