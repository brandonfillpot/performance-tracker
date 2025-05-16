"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginInputs = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInputs>();
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: LoginInputs) => {
    try {
      const result = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (!result?.ok) {
        const errorData = await result.json();
        setError(errorData || "Invalid Credentials");
        return;
      } else {
        router.push("/employees");
      }
    } catch (error) {
      console.error("Login failed", error);
      setError("Failed to connect to the server");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          {...register("email", { required: "Email is required" })}
          className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mb-4">{errors.email.message}</p>
        )}

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          {...register("password", { required: "Password is required" })}
          className="w-full p-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mb-4">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="w-full bg-green-600 text-white font-medium py-2 rounded-lg hover:bg-green-700 transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
