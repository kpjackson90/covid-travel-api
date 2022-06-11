import { CustomError } from "./custom-error";

export class NotVerifiedError extends CustomError {
  statusCode = 401;

  constructor() {
    super("User is not verified");

    Object.setPrototypeOf(this, NotVerifiedError.prototype);
  }

  serializeErrors() {
    return [{ message: "User is not verified" }];
  }
}
