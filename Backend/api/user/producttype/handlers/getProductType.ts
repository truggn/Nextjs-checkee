import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '..';
import ProductType from '@/models/ProductType';
import Organization from '@/models/Organization';
import Category from '@/models/Category'



const getProductType: ProductTypeHandlers['getProductType'] = async ({
    res,
    req,
    body
}) => {

    try {
        await dbConnect()

        const _data = await ProductType.find()
            .where({ isDeleted: false })
            .populate({
                path: 'categoryId',
                select: 'code name',
                model: Category
            })
            .populate({
                path: 'organizationId',
                select: 'name_customer code',
                model: Organization
            })
            .sort({ createdAt: 'desc' })
        if (_data.length > 0) return res.status(200).json({
            data: _data,
        });
        else return res.status(200).json({
            data: null
        })
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getProductType