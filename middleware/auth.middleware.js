import {JWT_SECRET} from './env.js'
import User from '../models/user.model.js';

export const authMiddleware = async (err, req, res, next) => {
    try {
        //BEARER TOKEN
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "You are not logged in! Please log in to get access."
            });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "The user belonging to this token does no longer exist."
            });
        }

        req.user = user;
        next();
    } catch (err) {
        next(err)
    }

}