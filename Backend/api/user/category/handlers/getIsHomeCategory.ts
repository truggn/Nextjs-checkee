import dbConnect from '@/utils/dbConnect';
import type { HomeCategoryHandlers } from '../isHomeCategory';
import Category from '@/models/Category';

const getIsHomeCategory: HomeCategoryHandlers['getIsHomeCategory'] = async ({
    req, res, body
}) => {
    try {
        await dbConnect()
        const _data = await Category.find()
            .where({ isHomeCategory: true})
            .sort({ indexHomeCategory: 1})
            .select('name icon indexHomeCategory')

        if (!_data) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không tải được dữ liệu danh mục."
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

export default getIsHomeCategory