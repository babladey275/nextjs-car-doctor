"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export const loginUser = async (payload) => {
  const { email, password } = payload;

  const userCollection = dbConnect(collectionNamesObj.userCollection);
  const user = await userCollection.findOne({ email });
  if (!user) return null;
  const isPasswordOk = bcrypt.compare(user.password, password);

  return user;
};
