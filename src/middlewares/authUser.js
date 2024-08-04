const { verify } = require('jsonwebtoken');

function authUser(request, response, next) {
    try {
        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response.status(400).json({ message: 'Token not attached' });
        }

        const [scheme, token] = authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {
            return response.status(400).json({ message: 'Malformed token' });
        }

        try {
            const result = verify(token, process.env.JWT_SECRET);

            request.userId = result.id;
            next();
        } catch (error) {
            if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
                return response.status(401).json({ message: 'The token is invalid or expired' });
            }
            return response.status(500).json({ message: 'The request failed' });
        }
    } catch (error) {
        console.error(error);
        return response.status(500).json({ message: 'An unexpected error occurred' });
    }
}

module.exports = authUser;
