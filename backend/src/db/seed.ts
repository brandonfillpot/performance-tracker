import { db } from "./client";
import { Employees, Reviews } from "./schema";

const seed = async () => {
  const [emp1, emp2, emp3] = await db
    .insert(Employees)
    .values([{ name: "Alice" }, { name: "Bob" }, { name: "John" }])
    .returning();

  await db.insert(Reviews).values([
    { score: 3, comment: "ok", employeeId: emp1.id },
    { score: 4, comment: "good", employeeId: emp2.id },
    { score: 5, comment: "best", employeeId: emp3.id },
  ]);

  console.log("seed complete");
  process.exit(0);
};

seed().catch(console.error);
