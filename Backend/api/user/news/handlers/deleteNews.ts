import dbConnect from '@/utils/dbConnect';
import type { NewsHandlers } from '../id';
import News from '@/models/News'


const deleteNews: NewsHandlers['deleteNews'] = async ({
    res,
    req,
    body: { id, deletedBy }
}) => {

    try {
        await dbConnect()

        const dataXoa = await News.findOneAndUpdate({
            _id: id
        },
            {
                isDeleted: true,
                deletedBy: deletedBy
            }, { new: true })
        if (!dataXoa) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: 'Xóa bài viết không thành công.'
                }]
            })
        } else {
            return res.status(200).json({
                data: dataXoa
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default deleteNews