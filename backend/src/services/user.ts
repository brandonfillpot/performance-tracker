import { eq } from "drizzle-orm";
import { db } from "../db/client";
import { Users } from "../db/schema";

export const findUser = async (email: string) => {
  const user = await db.query.Users.findFirst({
    where: eq(Users.email, email),
  });

  return user;
};
