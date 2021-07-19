import jwt from 'jsonwebtoken'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const authentication = (handler: NextApiHandler) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        // Get token and check if it exists
        let token: string | undefined;

        if (req.cookies && req.cookies['user-token']) {
            token = req.cookies['user-token'];
        } else {
            const authHeader = req.headers['authorization']
            // Authorization: Bearer token
            token = authHeader && authHeader.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({
                error: { message: 'You must login first' },
            });
        }

        try {
            const SECRET_KEY = process.env.JWT_SECRET ?? ''
            // Verify token
            const JwtPayload = jwt.verify(token, SECRET_KEY)

            req.jwtPayload = JwtPayload

            return handler(req, res);
        } catch (error) {
            return res.status(500).json({
                error: { message: 'You must login first' },
            });
        }
    };
}

export default authentication