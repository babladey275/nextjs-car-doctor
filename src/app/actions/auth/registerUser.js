"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNamesObj.userCollection);

  const user = await userCollection.findOne({ email: payload.email });

  if (!user) {
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;
    const result = await userCollection.insertOne(payload);

    const resultWithId = {
      ...result,
      insertedId: result.insertedId.toString(),
    };

    return resultWithId;
  }

  return null;
};
