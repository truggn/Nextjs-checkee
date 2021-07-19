import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { CategoryProductTypeHandlers } from '..';
import CateProductModel from '@/models/CategoryProductType'
import CategoryModel from '@/models/Category'
import ProductTypeModel from '@/models/ProductType'

const getProductTypeByCategoryID: CategoryProductTypeHandlers['getProductTypeByCategoryID'] = async ({
    req,
    res,
    body: { page, categoryID}
}) => {
    try {
        await dbConnect()
     

        const currentPage = page >= 1 ? page : 1;
        const pageSize = 8;

        const selectedFields = {
            'code': 1,
            'name': 1,
            'productRepresentation.url': 1
        }

        const _data = await CateProductModel.find()
                .where({ categoryID: categoryID })
                .skip(pageSize * (currentPage - 1))
                .limit(pageSize)
                .sort({ createdAt: 'desc'})
                .populate({
                    path: 'categoryID',
                    select: 'code name icon',
                    model: CategoryModel
                })
                .populate({
                    path: 'productTypeID',
                    select: selectedFields,
                    model: ProductTypeModel
                })
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

export default getProductTypeByCategoryID