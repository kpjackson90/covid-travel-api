import {Request,Response, NextFunction } from 'express';
import { jwt } from 'jsonwebtoken';



export const isAuth = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.headers.authorization;
    if (authorization) {
      //the slice function gets rid of the first 6 parts of the token and takes from the 7th digit
      const token = authorization.slice(7, authorization.length);
      //jwt is used to decrypt the token using verify then the second parameter is the JWT secrect.If token doesn't exist then use "somethingsecret"
      jwt.verify(
        token,
        process.env.JWT_KEY || "somethingsecret",
        (error, decode) => {
          if (error) {
            res.status(401).send({ message: "Invalid Token" });
          } else {
            req.user = decode;
            next();
          }
        }
      );
    } else {
      res.status(401).send({ message: "No Token" });
    }