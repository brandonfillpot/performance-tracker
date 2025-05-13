import { pgTable, uuid, integer, text } from "drizzle-orm/pg-core";

export const Employees = pgTable("employees", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
});

export const Reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  score: integer("score").notNull(),
  comment: text("comment"),
  employeeId: uuid("employee_id")
    .references(() => Employees.id)
    .notNull(),
});
