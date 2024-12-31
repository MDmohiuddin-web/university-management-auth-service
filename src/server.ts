import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

const db = async () => {
  try {
    await mongoose.connect(config.database_url as string); 
    console.log(`✌️ Data base connected success fully ✌️`);

    app.listen(config.port, () => {
      console.log(`Server is running on PORT ${config.port}`);
    });
  } catch (error) {
    console.error(`Error connecting to database`);
  }
};

db();

