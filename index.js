import express  from "express";
import cors from "cors";
import CONNECT_DATABASE from "./Database/server.js";
import route from "./Routes/userRoute.js";

const app = express()


// Middleware for parsing JSON requests
app.use(express.json())
app.use(cors())


//Define USER ROUTE
app.use('/user', route)

CONNECT_DATABASE(process.env.DB_URL)
app.listen(process.env.port,(req,res)=>{
    console.log(`Express Connected At Port ${process.env.port}`)
})