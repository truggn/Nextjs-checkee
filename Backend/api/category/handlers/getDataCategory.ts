import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '..';
import CategoryModel, { CategoryDocument } from '@/models/Category';
import UserDocument from '@/models/User'


const getDataCategory: CategoryHandlers['getDataCategory'] = async ({
    req, res, body
}) => {
    try {
        await dbConnect()             

        const _data = await CategoryModel.find()
                .where({ isDeleted: false })
                .sort({ createdAt: 'desc'})
                .populate({
                    path: 'createdBy',
                    select: 'firstName lastName',
                    model: UserDocument
                })

        if (!_data) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không tải được dữ liệu bài viết."
                }]
            })
        }
        return res.status(200).json({
            data: _data,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default  getDataCategory