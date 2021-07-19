import dbConnect from '@/utils/dbConnect';
import User, { PayloadJWT } from '@/models/User';
import type { LoggedInUserHandlers } from '../get-logged-in-user';
import { verify } from 'jsonwebtoken'

const getLoggedInUser: LoggedInUserHandlers['getLoggedInUser'] = async ({
    req,
    res,
    body
    // config,
}) => {
    const token = req.cookies['user-token']

    try {
        if (!token) {
            return res.status(401).json({
                data: null,
                errors: [{message: 'Unauthorized'}]
            })
        }

        await dbConnect()

        let infoUser
        const SECRET_KEY: string = process.env.JWT_SECRET ?? ''

        await verify(token, SECRET_KEY, async function (err, decoded : PayloadJWT) {
            if (!err && decoded) {
                const _infoUser = await User.findById(decoded.id).lean();

                if (_infoUser) infoUser = _infoUser
            }
        });

        if (!infoUser) {
            return res.status(401).json({
                data: null,
                errors: [{message: 'Unauthorized'}]
            })
        }

        return res.status(200).json({
            data: infoUser,
        })

    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        })
    }
}

export default getLoggedInUser;