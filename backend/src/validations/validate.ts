import {
  employeeSchema,
  reviewSchema,
  EmployeeInput,
  ReviewInput,
} from "./schema";

type SchemaMap = {
  employee: EmployeeInput;
  review: ReviewInput;
};

export const validateData = async <K extends keyof SchemaMap>(
  schemaType: K,
  data: unknown
): Promise<SchemaMap[K]> => {
  try {
    const schema = {
      employee: employeeSchema,
      review: reviewSchema,
    }[schemaType];

    if (!schema) {
      throw new Error("Invalid schema type");
    }

    const validData = await schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    return validData as SchemaMap[K];
  } catch (error: any) {
    const messages = error.errors || [error.message];
    throw new Error(messages.join(", "));
  }
};
