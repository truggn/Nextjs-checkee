import dbConnect from '@/utils/dbConnect';
import User, { UserDocument } from '@/models/User';
import type { UsersHandlers } from '..';
import cloudinary from 'Backend/middlewares/cloudinary';


// Return all employees info
const updateUser: UsersHandlers['updateUser'] = async ({
    res,
    req,
    body: { address, image_url, firstName, lastName, phone },
    // config,
}) => {
    let result: { data: UserDocument[] | null } = { data: null }

    try {
        await dbConnect()

        const userID = req.body.userID;

        if (!userID) {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'userID không xác định' }],
            });
        }

        const url_avata = await cloudinary.v2.uploader.upload(image_url, {
            folder: `Avata_User`,
            transformation: [{
                width: 320,
                height: 320
            }],
            format: 'jpg'
        })
        const _user = await User.findOneAndUpdate({
            _id: userID,
            isDeleted: false
        }, {
            address: address,
            image_url: url_avata.url,
            firstName: firstName,
            lastName: lastName,
            phone: phone

        }, { new: true });


        if (!_user || _user === null || _user === '') {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'User không tồn tại' }],
            });
        }

        result.data = _user;



    } catch (error) {
        return res.status(400).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }

    return res.status(200).json({
        data: result.data,
        errors: [{ message: 'Cập nhật thành công.' }],
    });


}

export default updateUser