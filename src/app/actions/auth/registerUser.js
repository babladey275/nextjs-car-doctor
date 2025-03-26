"use server";

import bcrypt from "bcrypt";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";

export const registerUser = async (payload) => {
  const userCollection = dbConnect(collectionNamesObj.userCollection);

  try {
    // Check if the user already exists
    const existingUser = await userCollection.findOne({ email: payload.email });

    if (existingUser) {
      return {
        success: false,
        message: "User already exists with this email.",
      };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(payload.password, 10);
    payload.password = hashedPassword;

    const result = await userCollection.insertOne(payload);

    const resultWithId = {
      success: true,
      user: {
        ...payload,
        _id: result.insertedId.toString(),
        insertedId: result.insertedId.toString(),
      },
    };

    return resultWithId;
  } catch (error) {
    return {
      success: false,
      message: "An error occurred during registration. Please try again.",
    };
  }
};
