import dbConnect from '@/utils/dbConnect';
import type { NewsHandlers } from '..';
import NewsModel from '@/models/News';
import User from '@/models/User'


const getDataNews: NewsHandlers['getDataNews'] = async ({
    res,
    req,
    body: { page }
}) => {

    try {
        await dbConnect()

        const currentPage = page >= 1 ? page : 1;
        const pageSize = 8;
        const _data = await NewsModel.find()
            .where({ isDeleted: false }).select('images title content createdAt')
            .skip(pageSize * (currentPage - 1))
            .limit(pageSize).sort({ createdAt: 'desc' })
            .populate({
                path: 'createdBy',
                select: 'firstName lastName',
                model: User
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

export default getDataNews