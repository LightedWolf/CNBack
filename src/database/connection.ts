import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    const dbUrl = process.env.DB_CONNECTION;
    if (!dbUrl) {
      throw new Error("Error Database URL");
    }

    await mongoose.connect(dbUrl);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    console.log("Error Database Connection");
  }
};
