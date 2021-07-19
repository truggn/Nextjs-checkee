import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '../list_data';
import Category from '@/models/Category';

const getListCategory: CategoryHandlers['getListCategory'] = async ({
    req, res, body
}) => {
    try {
        await dbConnect()             

        const _data = await Category.find()
              .where({ isDeleted: false })
              .sort({ createdAt: 'desc'})
              .select('name icon')
              
        
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

export default  getListCategory