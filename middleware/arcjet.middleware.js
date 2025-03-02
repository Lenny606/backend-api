import arcjet from 'arcjet';

export const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await arcjet.protect(req, { requested: 1});

        if ( decision.isDenied()) {
           if( decision.reason.isRateLimit()) {
            return res.status(429).json({
                success: false,
                message: "Too many requests. Please try again later."
            });
           }
           if (decision.reason.isBot()) {
            return res.status(403).json({
                success: false,
                message: "Access denied. Bot protection triggered."
            });
           }
           
           return res.status(403).json({
            success: false,
            message: "Access denied. Arcjet protection triggered."
           });
        }

        next();
    } catch (error) {
        next(error);
    }
}
