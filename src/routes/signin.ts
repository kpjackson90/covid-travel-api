import express, { Request, Response } from "express";
import { body } from "express-validator";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import { validateRequest, BadRequestError } from "../middlewares";
import { Password } from "../services";
import { isAuth } from "../middlewares/require-auth";

const router = express.Router();

router.post(
  "/api/users/signin", isAuth,
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError("Invalid credentials");
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError("Invalid credentials");
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
      { expiresIn: "24h" }
    );

    res.status(200).send({ existingUser, token: userJwt });
  }
);

export { router as signinRouter };
