import { db } from "./client";
import { Users, Employees, Reviews } from "./schema";

const seed = async () => {
  // Clear data in order of dependencies (Reviews → Employees → Users)
  await db.delete(Reviews);
  await db.delete(Employees);
  await db.delete(Users);

  // 1. Create a user
  const [user] = await db
    .insert(Users)
    .values({
      name: "Brandon Fillpot",
      email: "brandon@example.com",
      password: "password123", // ⚠️ hash this in production!
    })
    .returning();

  // 2. Seed employees with userId
  const employeeData = [
    {
      firstName: "Alice",
      lastName: "Wong",
      title: "Senior Software Engineer",
      startDate: "2021-04-15",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      userId: user.id,
    },
    {
      firstName: "Bob",
      lastName: "Martinez",
      title: "Product Manager",
      startDate: "2022-08-01",
      image: "https://randomuser.me/api/portraits/men/45.jpg",
      userId: user.id,
    },
    {
      firstName: "John",
      lastName: "Kim",
      title: "UX Designer",
      startDate: "2023-02-10",
      image: "https://randomuser.me/api/portraits/men/12.jpg",
      userId: user.id,
    },
  ];

  const [emp1, emp2, emp3] = await db
    .insert(Employees)
    .values(employeeData)
    .returning();

  // 3. Seed reviews
  await db.insert(Reviews).values([
    { score: 3, comment: "ok", employeeId: emp1.id },
    { score: 4, comment: "good", employeeId: emp2.id },
    { score: 5, comment: "best", employeeId: emp3.id },
  ]);

  console.log("seed complete");
  process.exit(0);
};

seed().catch(console.error);
