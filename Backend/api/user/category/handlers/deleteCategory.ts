import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '../id';
import CategoryModel, { CategoryDocument } from '@/models/Category';

const deleteCategory: CategoryHandlers['deleteCategory'] = async ({
    req,
    res,
    body: { id, deletedBy}
}) => {
    try {
        await dbConnect()

        const deletedData = await CategoryModel.findOneAndUpdate({
            _id: id
        }, {
            isDeleted: true,
            deletedBy: deletedBy
        }, {new: true} )
        

        if(!deletedData) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: 'Xóa bài viết không thành công.'
                }]
            })
        } else {
            return res.status(200).json({
                data: deletedData
            })
        }


    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default deleteCategory