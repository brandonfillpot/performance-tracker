import * as yup from "yup";

export const employeeSchema = yup.object({
  firstName: yup
    .string()
    .required("First name is required")
    .max(50, "First name is too long"),
  lastName: yup
    .string()
    .required("Last name is required")
    .max(50, "Last name is too long"),
  title: yup
    .string()
    .required("Job title is required")
    .max(100, "Job title title is too long"),
  startDate: yup
    .string()
    .typeError("Start date must be a valid date")
    .required("Start date is required"),
  image: yup.string().url("Image must be a valid URL"),
  userId: yup.string().required(),
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
