// modules
import express from "express";
import cors from "cors";
import { db } from "./db/client";
import cookieParser from "cookie-parser";
// validations
import { Employees, Reviews } from "./db/schema";
import { validateData } from "./validations/validate";
// classes
import { AuthError } from "./errors/AuthError";
// services
import { findUser } from "./services/user";
import { createToken } from "./services/auth";

const app = express();
const PORT = 3456;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Root route
app.get("/", (req, res) => {
  res.send("API is running 🎉");
});

app.post("/auth/login", async (req, res): Promise<any> => {
  try {
    const { email, password } = req.body;

    const user = await findUser(email);

    if (!user || user.password !== password) {
      throw new AuthError();
    }

    const token = createToken({ id: user.id, email: user.email });

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      })
      .status(200)
      .json({
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
        },
      });
  } catch (error: any) {
    if (error.name === "AuthError") {
      return res.status(401).send(error.message);
    }
    return res.status(500).send("Internal server error");
  }
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
