import express  from "express";
import cors from "cors";
import CONNECT_DATABASE from "./Database/server.js";
import route from "./Routes/userRoute.js";
import PRODUCT_ROUTE from "./Routes/productRoute.js";
import category_route from "./Routes/categoriesRoute.js";
import ADMIN_ROUTES from "./Routes/AdminRoutes/adminRoute.js";
import adminAuthenticateToken from "./Middleware/Admin/adminMiddleware.js";


const app = express()


// Middleware for parsing JSON requests
app.use(express.json())
app.use(cors())

app.use('/product/create-product' ,adminAuthenticateToken("admin","user") )

//Define USER ROUTE
app.use('/user', route)
//Define PRODUCT ROUTE
app.use('/product', PRODUCT_ROUTE)
//Define PRODUCT ROUTE
app.use('/category', category_route)
//Define ADMIN ROUTE
app.use('/admin', ADMIN_ROUTES)


CONNECT_DATABASE(process.env.DB_URL)
app.listen(process.env.port,(req,res)=>{
    console.log(`Express Connected At Port ${process.env.port}`)
})

