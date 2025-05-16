export class AuthError extends Error {
  constructor(message: string = "Invalid credentials") {
    super(message);
    this.name = "AuthError";
  }
}
