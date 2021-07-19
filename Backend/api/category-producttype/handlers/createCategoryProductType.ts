import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { CategoryProductTypeHandlers } from '..';
import CateProduct from '@/models/CategoryProductType'
import Category from '@/models/Category'
import ProductType from '@/models/ProductType'

const createCategoryProductType: CategoryProductTypeHandlers['createCategoryProductType'] = async ({
    req,
    res,
    body: { categoryID, productTypeID, createdBy}
}) => {
    try {
        await dbConnect()

        if (categoryID === null ) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm id danh mục'
                }]
            })
        } if (productTypeID === null ) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm id cho sản phẩm'
                }]
            })
        }

        const checkCategory = await Category.findOne({ _id: categoryID})
        const checkProductType = await ProductType.findOne({ _id: productTypeID})
        if(!checkCategory) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Danh mục không tồn tại'
                }]
            })
       } 
       if(!checkProductType) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Sản phẩm không tồn tại'
                }]
            })
       }

       const data = {
           categoryID: categoryID,
           productTypeID: productTypeID,
           createdBy: createdBy,
       }

       const _dataCateProductType = await CateProduct.create(data)
       if(!_dataCateProductType)  return res.status(400).json({
            data: null,
            errors: [{
                message: "Tạo liên kết không thành công."
            }]
        })
        else {
            await checkProductType.updateOne({
                categoryId: _dataCateProductType.categoryID
            })
            return res.status(400).json({
                data: _dataCateProductType
            })
        }


    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export default createCategoryProductType