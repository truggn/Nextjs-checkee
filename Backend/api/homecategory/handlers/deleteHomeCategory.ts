import dbConnect from '@/utils/dbConnect';
import type { HomeCategoryHandlers } from '../id';
import HomeCategory from '@/models/HomeCategory';
import Category from '@/models/Category';

const deleteHomeCategory: HomeCategoryHandlers['deleteHomeCategory'] = async ({
    req,
    res,
    body: { id, deletedBy}
}) => {
    try {
        await dbConnect()
        const deletedData = await HomeCategory.findOneAndUpdate({
            _id: id
        }, {
            isDeleted: true,
            deletedBy: deletedBy
        }, {new: true} )
       
        if(deletedData) {
             
            await Category.findOne({
                _id: deletedData.category 
            }).updateOne({ $unset: { homeCategory: 1 }})
            
            return res.status(200).json({
                data: deletedData
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: 'Xóa bài viết không thành công.'
                }]
            })
        }

      
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
     
}

export default deleteHomeCategory