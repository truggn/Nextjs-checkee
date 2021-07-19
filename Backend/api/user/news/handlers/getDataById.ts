import dbConnect from '@/utils/dbConnect';
import type { NewsHandlers } from '../id';
import NewsModel, { NewsDocument } from '@/models/News';
import User from '@/models/User'

const getDataNewsById: NewsHandlers['getDataNewsById'] = async ({
    res,
    req,
    body
}) => {
    await dbConnect()
    try {
        const _data = await NewsModel.findOne({ _id: req.query.id })
            .where({ isDeleted: false })
            .select('images title content createdAt')
            .populate({
                path: 'createdBy',
                select: 'firstName lastName',
                model: User
            })
        if (!_data) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: `Không tìm thấy bài đăng này.`
                }]
            })
        } else {
            return res.status(200).json({
                data: _data
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getDataNewsById