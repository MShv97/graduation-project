import { sign } from "jsonwebtoken";

export default (payload: any) => {
  const access_token = sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.JWT_ACCESS_expiresIn,
  });
  const refresh_token = sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_expiresIn,
  });
  return { access_token, refresh_token };
};
