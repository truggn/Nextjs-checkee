import User from '@/models/User';
import jwt from "jsonwebtoken";


async function auth(req, res) : Promise<number> {

	try {

        const token = req.cookies['user-token'];

        // const token = req.headers.authorization.replace('Bearer ', '');

        // Xác thực token
        let flag : number = 2
        const SECRET_KEY: string = process.env.JWT_SECRET ?? ''

        await jwt.verify(token, SECRET_KEY, async (err, payload) => {

            if (!err && payload) {
                const user = await User.findById('payload.id')
                    .select('email');

                // console.log('jwt.verify', user);

                if (!user) {
                    flag = 3;
                    // return res.status(401).json({
                    //     message: "Không đủ quyền truy cập"
                    // }) 
                }

            // return payload;
            } else {
                flag = 2;

                // return res.status(401).json({
                //    message: "Token không hợp lệ"
                // }) 
            }   

            flag = 1

        });

        return flag
    } catch (error) {
        // console.log(error);
        return 0
    }
};

export default auth