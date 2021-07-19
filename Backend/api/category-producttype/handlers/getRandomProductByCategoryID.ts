import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { CateProductHandlers } from '../random';
import CateProductModel from '@/models/CategoryProductType'
// import CategoryModel from '@/models/Category'
// import ProductTypeModel from '@/models/ProductType'

const getRandomProductByCategoryID: CateProductHandlers['getRandomProductByCategoryID'] = async ({
    req,
    res,
    body: { categoryID }
}) => {
    try {
        await dbConnect()

        const id = new mongoose.Types.ObjectId(categoryID)     

        const _data = await CateProductModel.aggregate([
            { $match: { categoryID: id}},
            { $sample: { size: 10 }},
            { $lookup: {
                from: 'producttypes',
                localField: 'productTypeID',
                foreignField: '_id',
                as: 'productype'
            }},
            { $lookup: {
                from: 'categories',
                localField: 'categoryID',
                foreignField: '_id',
                as: 'category'
                
            }},
            { $project: { 
                "categoryID": 1,
                "productTypeID": 1,
                "category.code": 1,
                "category.name": 1,
                "productype.code": 1,
                "productype.name": 1,
            }},
        ])
                              
        if(!_data){
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không tải được dữ liệu danh mục sản phẩm"
                }]
            })
        }
        return res.status(200).json({
            data: _data,
        });

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export default getRandomProductByCategoryID