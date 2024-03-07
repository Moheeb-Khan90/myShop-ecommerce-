dotenv.config()
import dotenv from "dotenv";
import jwt  from "jsonwebtoken";
const KEY = process.env.SECRET_KEY

const authenticateToken = async (req, res, next) => {
    try {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(403).json({
            error: "No token found"
        });
    }

        // const decodedToken = Jwt.verify(authorization, KEY);
        jwt.verify(authorization,KEY, (err, user) => {
            if (err) {
              return res.status(403).json({ error: 'Invalid token' });
            }
            req.user = user; 
        })        

        next();
    } catch (error) {
        return res.status(401).json({
            error: "Invalid token",
            message: "Token verification failed"
        });
    }
};

export default authenticateToken;
