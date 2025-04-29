import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { fullname, email, password, contact } = req.body;
  } catch (error) {
    console.log("error in signup controller", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
