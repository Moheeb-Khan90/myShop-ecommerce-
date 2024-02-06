dotenv.config()
import mongoose from "mongoose";
import dotenv  from "dotenv";

const CONNECT_DATABASE = async (URL) =>{
    try {
        const DATABASE_NAME = 
        {
            dbName:process.env.databaseName 
        }
        await mongoose.connect(URL,DATABASE_NAME)
        console.log("mongoose connected successfully")
    } catch (error) {
        console.log("mongoose not connected")
    }

}

export default CONNECT_DATABASE

