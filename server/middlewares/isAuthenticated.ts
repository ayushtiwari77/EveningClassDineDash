import jwt from "jsonwebtoken";

import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      id: string;
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    //verify token

    const decode = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    //checking verification is successfull
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    req.id = decode.userId;

    next();
  } catch (error) {
    console.log("error in authenticator middleware", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
