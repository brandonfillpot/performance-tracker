// modules
import express from "express";
import cors from "cors";
import { db } from "./db/client";
// validations
import { Users, Employees, Reviews } from "./db/schema";
import { validateData } from "./validations/validate";
import { eq } from "drizzle-orm";

const app = express();
const PORT = 3456;

app.use(cors());
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🎉");
});

app.post("/auth/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await db.query.Users.findFirst({
    where: eq(Users.email, email),
  });
  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid credentials" });
  }

  res.json({ id: user?.id, name: user?.name, email: user?.email });
});

app.get("/employees", async (req, res) => {
  const employees = await db.select().from(Employees);
  res.send(employees);
});

app.post("/employees", async (req, res) => {
  try {
    const validData = await validateData("employee", req.body);

    const result = await db.insert(Employees).values(validData).returning();
    res.status(201).send(result[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.post("/reviews", async (req, res) => {
  try {
    const validData = await validateData("review", req.body);
    const result = await db.insert(Reviews).values(validData).returning();
    res.status(201).send(result[0]);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
