dotenv.config()
import dotenv from "dotenv";
import USER_MODEL from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";
const KEY = process.env.SECRET_KEY

class USER_CONTROLLER {

    static SIGN_IN = async (req, res) => {
        let success = true
        const { User_Name, User_Email, User_Password, User_Address, User_Contact_Number } = req.body
        try {
            //Check User Exist Or Not
            const isExist_User = await USER_MODEL.findOne({
                User_Email: User_Email
            })
            if (isExist_User) {
                success = false
                return res.status(409).json(
                    {
                        success,
                        error: 'User already exists'
                    }
                );
            }
            //Password Hashing 
            // const salt = bcrypt.genSaltSync(10)
            // const password_hash = bcrypt.hashSync(User_Password, salt)
            //User does not exist
            const NEW_USER = new USER_MODEL(
                {
                    User_Name,
                    User_Email,
                    User_Password,
                    User_Address,
                    User_Contact_Number
                }
            )

            await NEW_USER.save()
            const token = Jwt.sign(
                {
                    USERID: NEW_USER._id
                },
                KEY
            )
            success = true
            return res.status(200).json(
                {
                    success,
                    message: "Signin successfully ",
                    token
                })

        } catch (error) {
            console.log(error)
        }
    }

    //Get all USER information
    static GET_USER_INFO = async (req, res) => {
        const { id } = req.params
        try {
            const USER_INFO = await USER_MODEL.findById(id).select("-User_Password")
            if (!USER_INFO) {
                return res.status(404).json(
                    {
                        status: 'failed',
                        message: 'User not found'
                    }
                );
            }

            return res.status(200).json(
                {
                    status: "fullfield",
                    USER_INFO
                })

        } catch (error) {
            console.log(error)
        }

    }

    //Update User Information
    static UPDATE_USER_INFO = async (req, res) => {
        let success = true
        //extract ID in token
        const { USERID } = req.user
        const { User_Name, User_Address, User_Contact_Number } = req.body


        try {
            const isExist = await USER_MODEL.findById(USERID)
            if (!isExist) {
                success = false
                return res.status(409).json(
                    {
                        success,
                        error: 'User not found'
                    }
                );

            }
            const updatedUser = {
                User_Name,
                User_Address,
                User_Contact_Number
            };

            const update_user_info = await USER_MODEL.findByIdAndUpdate(
                {
                    _id: USERID
                },
                updatedUser,
                { new: true, runValidators: true }

            )

            return res.status(200).json({
                status: 'fulfilled',
                message: 'User information updated successfully',
                update_user_info
            });
        } catch (error) {
            return res.status(500).json({
                status: 'failed',
                message: 'Internal Server Error'
            })
        }
    }

    //Change Password 
    static CHANGE_PASSWORD = async (req, res) => {
        try {
            //extract ID in token
            const { USERID } = req.user
            const { old_password, new_password } = req.body

            const lengthOfNewPassword = new_password.length
            const lengthOfOldpassword = old_password.length

            //Old Password
            if (!lengthOfOldpassword) {
                return res.status(403).json(
                    {
                        "error": "Enter the old password"
                    }
                )
            }

            if (lengthOfOldpassword < 7) {
                return res.status(403).json(
                    {
                        "error": "older password must be minimum 6 chracters"
                    }
                )
            }

            //New password
            if (!lengthOfNewPassword) {
                return res.status(403).json(
                    {
                        "error": "Enter the new password"
                    }
                )
            }
            if (lengthOfNewPassword < 7) {
                return res.status(403).json(
                    {
                        "error": "New password must be minimum 6 chracters"
                    }
                )
            }

            //Getting old password
            const hash_passowrd = await USER_MODEL.findOne({ _id: USERID }).select('User_Password')
            //Compare Password
            const compare_password = await bcrypt.compare(old_password, hash_passowrd.User_Password)
            if (!compare_password) {
                return res.status(404).json(
                    {
                        "message": "Old Password Does't Match"
                    }
                )
            }
            const new_password_salt = bcrypt.genSaltSync(10)
            const new_password_hash = bcrypt.hashSync(new_password, new_password_salt)
            console.log(new_password_hash)
            await USER_MODEL.findByIdAndUpdate(
                USERID,
                {
                    $set: { User_Password: new_password_hash }

                },
                { new: true, runValidators: true }

            ).select('User_Password')
            return res.status(200).json(
                {

                    "message": "Password Updated"
                }
            )


        } catch (error) {
            console.log(error)
        }


    }

    //Forget Password
    static FORGET_PASSWORD = async (req,res) =>{
        return res.json("forget")
    }
}
export default USER_CONTROLLER;