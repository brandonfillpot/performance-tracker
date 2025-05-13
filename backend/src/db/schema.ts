import { pgTable, uuid, integer, text, date } from "drizzle-orm/pg-core";

export const Users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(), // hashed password in real app
});

export const Employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  title: text("title").notNull(),
  startDate: date("start_date").notNull(),
  image: text("image"),
  userId: uuid("user_id")
    .notNull()
    .references(() => Users.id),
});

export const Reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  score: integer("score").notNull(),
  comment: text("comment"),
  employeeId: uuid("employee_id")
    .references(() => Employees.id)
    .notNull(),
});
