import jwt from "jsonwebtoken";

export const createToken = (payload: { id: string; email: string }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });

  return token;
};
