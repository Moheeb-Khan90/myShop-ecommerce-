import dotenv from 'dotenv'
dotenv.config()
import Jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import ADMIN_MODEL from "../../Models/Admin/adminModel.js"
const KEY = process.env.SECRET_KEY
class ADMIN{
    static ADD_USERS = async(req,res) =>{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const firstError = errors.array()[0];
            const firstErrorMsg = firstError.msg;
            res.status(403).json(
                {
                    msg: firstErrorMsg
                }
            )
        }else{
            const { name, email, password, role } = req.body
            try {
                //Check User Exist Or Not
                const isExist_User = await ADMIN_MODEL.findOne({
                    email: email
                })
                if (isExist_User) {
                    return res.status(409).json(
                        {
                            status:"failed",
                            error: 'User already exists'
                        }
                    )
                }
                //User does not exist
                const ADD_USER = new ADMIN_MODEL(
                    {
                        name,
                        email,
                        password,
                        role
                    }
                )
                await ADD_USER.save()
                const token = Jwt.sign(
                    {
                        USERID: ADD_USER._id,
                        ROLE:ADD_USER.role
                    },
                    KEY
                )
                return res.status(200).json(
                    {
                        status:"fulfilled",
                        message: "Signin successfully ",
                        token
                    })
            } catch (error) {
                console.log(error)
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }
        }
       

    }

}

export default ADMIN