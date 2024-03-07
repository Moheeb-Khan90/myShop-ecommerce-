import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const KEY = process.env.SECRET_KEY

const adminAuthenticateToken = (allowedRoles) => {
    return (req, res, next) => {
        try {
            const { authorization } = req.headers;
            if (!authorization || !authorization.startsWith('bearer ')) {
                return res.status(401).json(
                    {
                        error: 'Unauthorized',
                        message: 'Bearer token missing'
                    }
                );
            }
            //get token from header
            const token = authorization.split(' ')[1]
            const { ROLE } = jwt.verify(token, KEY);

            if (allowedRoles.includes(ROLE)) {
                req.user = ROLE
                next()
            } else {
                return res.status(403).json(
                    {
                        error: 'Forbidden',
                        message: 'Insufficient role privileges'
                    }
                );
            }
        } catch (error) {
            return res.status(401).json({
                error: "Invalid token",
                message: "Token verification failed"
            });
        }

    }



}

export default adminAuthenticateToken;
