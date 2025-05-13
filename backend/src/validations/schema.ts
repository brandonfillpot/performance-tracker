import * as yup from "yup";

export const employeeSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export const reviewSchema = yup.object({
  employeeId: yup
    .string()
    .uuid("Must be a valid UUID")
    .required("Employee ID is required"),
  score: yup
    .number()
    .required("Score is required")
    .min(1, "Score must be at least 1")
    .max(5, "Score must be at most 5"),
  comment: yup.string().optional(),
});

export type EmployeeInput = yup.InferType<typeof employeeSchema>;
export type ReviewInput = yup.InferType<typeof reviewSchema>;
