import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") }) 
export default {
  port: process.env.PORT || 5000 ,
  database_url: process.env.DATABASE_URL || 
  "mongodb+srv://university-admin:oMpOWdyMs6u2GYXd@cluster0.r47if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
};