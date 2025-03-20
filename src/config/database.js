import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    const connectionString = process.env.MONGODB_URL;
    const status = await mongoose.connect(connectionString, {
      dbName: "OrangeStore-Database",
    });
    console.log(`Database connected at ${status.connection.host}`);
  } catch (error) {
    console.log("error connecting database", error.message);
    process.exit(1);
  }
};

export default dbConnect;
