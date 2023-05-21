import mongoose from "mongoose"
export const MongooseConnection = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/nmap").then(() => console.log("Nmap Database connection established")).catch(() => console.log("Database connection failed"))
}