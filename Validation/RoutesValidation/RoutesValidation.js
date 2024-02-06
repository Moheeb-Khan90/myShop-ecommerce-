import mongoose from "mongoose";

const user_route_validate = (req,res,next) =>{
    const { id } = req.params
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        res.status(400).send('This Page Is Not Found');
    }

}
export default user_route_validate