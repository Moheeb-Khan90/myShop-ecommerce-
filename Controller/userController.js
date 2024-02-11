import dotenv from "dotenv";
import USER_MODEL from "../Models/userModel.js";
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
// import transporter from "../Services/emailConfig.js";
const KEY = process.env.SECRET_KEY
dotenv.config()

class USER_CONTROLLER {

    static SIGN_IN = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0];
            const firstErrorMsg = firstError.msg;
            res.status(403).json(
                {
                    msg: firstErrorMsg
                }
            )
        } else {
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
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }
        }
    }

    //Get all USER information
    static GET_USER_INFO = async (req, res) => {
        try {
            const USER_INFO = await USER_MODEL.findById(req.user.USERID).select("-User_Password")
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
            return res.status(500).json(
                {
                    message: "internal server error",
                })
        }

    }

    //Update User Information
    static UPDATE_USER_INFO = async (req, res) => {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            const firstError = errors.array()[0]
            const firstErrorMsg = firstError.msg

            return res.status(403).json({
                msg: firstErrorMsg
            })
        } else {
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

                await USER_MODEL.findByIdAndUpdate(
                    {
                        _id: USERID
                    },
                    updatedUser,
                    { new: true, runValidators: true }

                )

                return res.status(200).json({
                    status: 'fulfilled',
                    message: 'User information updated successfully',
                });
            } catch (error) {
    
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }
        }
    }

    //Change Password 
    static CHANGE_PASSWORD = async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const firstError = errors.array()[0]
            const firstErrorMsg = firstError.msg
            return res.status(403).json(
                {
                    msg: firstErrorMsg
                }
            )
        } else {


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

                await USER_MODEL.findByIdAndUpdate(
                    USERID,
                    {
                        $set: { User_Password: new_password_hash }

                    }

                ).select('User_Password')
                return res.status(200).json(
                    {

                        "message": "Password Updated"
                    }
                )


            } catch (error) {
                console.log(error)
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }


        }
    }
    //LOGIN 
    static USER_LOGIN = async (req, res) => {
        const { email, password } = req.body
        const error = validationResult(req)
        if (!error.isEmpty()) {
            const firstError = error.array()[0]
            const firstErrorMsg = firstError.msg
            return res.status(403).json(
                {
                    msg: firstErrorMsg
                }
            )
        } else {
            try {
                const isValid_user = await USER_MODEL.findOne({ User_Email: email })
                if (!isValid_user) {
                    return res.status(401).json(
                        {
                            msg: "invalid credentials"
                        }
                    )
                }
                const isValid_password = await bcrypt.compare(password, isValid_user.User_Password)
                if (!isValid_password) {
                    return res.status(401).json(
                        {
                            msg: "invalid credentials"
                        }
                    )
                }
                const login_token = Jwt.sign(
                    {
                        USERID: isValid_user._id
                    },
                    KEY
                )
                console.log(isValid_user._id)
                return res.status(200).json(
                    {
                        status: "fullfilled",
                        login_token
                    }
                )



            } catch (error) {
                return res.status(500).json(
                    {
                        message: "internal server error",
                    })
            }
        }
    }

    //Forget Password
    // static FORGET_PASSWORD = async (req, res) => {
    //     const { email } = req.body
    //     try {
    //         //check email exist or not
    //         const isEmail = await USER_MODEL.findOne({ User_Email: email })
    //         if (!isEmail) {
    //             res.status(401).json(
    //                 {
    //                     message: "email does not exist"
    //                 }
    //             )
    //         } else {
    //             //Create Secret Key
    //             const secret_key = isEmail._id + KEY
    //             const token = Jwt.sign(
    //                 { userID: USER_MODEL._id }
    //                 , secret_key,
    //                 // {
    //                 //     expiresIn: '5m'
    //                 // }
    //             )
    //             const link = `http://127.0.0.1:8080/user/rest/${isEmail._id}/${token}`

    //             //SEND EMAIL
    //             const mailOption = {
    //                 from: process.env.EMAIL_FROM,
    //                 to: isEmail.User_Email,
    //                 subject: "Hello ✔", // Subject line
    //                 text: "Hello world", // plain text body
    //                 html: `<a href=${link}>click here</a>`
    //             }
    //            transporter.sendMail(mailOption, (err,info) =>{
    //             if (err) {
    //                 console.log(err);
    //               } else {
    //                 console.log('Email sent: ' + info.response);
    //               }
    //             })
    //             return res.status(200).json(
    //                 {
    //                     status: "check your email"
    //                 }
    //             )
    //         }

    //     } catch (error) {
    //         console.log(error)

    //     }

    // }

    // static USER_NEW_PASSWORD = async (req, res) => {
    //     const errors = validationResult(req)
    //     if (!errors.isEmpty()) {
    //         const firstError = errors.array()[0]
    //         const firstErrorMsg = firstError.msg
    //         return res.status(403).json({
    //             msg: firstErrorMsg
    //         })
    //     }
    //     const { newPassword } = req.body
    //     const { id, tk } = req.params

    //     try {
    //         const check_user = await USER_MODEL.findById(id)
    //         const new_secret_key = check_user._id + KEY
    //         //VERIFYING TOKEN
    //         Jwt.verify(tk, new_secret_key)
    //         //Password Hashing 
    //         const salt = bcrypt.genSaltSync(10)
    //         const password_hash = bcrypt.hashSync(newPassword, salt)
    //         await USER_MODEL.findByIdAndUpdate(
    //             check_user._id,
    //             { $set: { User_Password: password_hash } }
    //         )

    //         return res.status(200).json(
    //             {
    //                 "status": " password reset successfully "
    //             }
    //         )
    //     }


    //     catch (error) {
    //         console.log(error)

    //     }


    // }


}
export default USER_CONTROLLER;