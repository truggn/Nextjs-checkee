import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '../detail_all';
import CategoryModel from '@/models/Category';

const getDetailAllCategory: CategoryHandlers['getDetailAllCategory'] = async ({
    req, res, body
}) => {
    try {
        await dbConnect()             

        const _data = await CategoryModel.find({})
              .where({ isDeleted: false,  level: 1})
              .sort({ createdAt: 'desc'})
              .select('code name level ')
              .populate({
                  path: 'subcategoryId',
                  select: 'code name level subcategoryId ',
                  populate: {
                      path: 'subcategoryId',
                      select: 'code name level '
                  }
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

export default  getDetailAllCategory