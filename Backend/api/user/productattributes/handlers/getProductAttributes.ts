import dbConnect from '@/utils/dbConnect';
import type { ProductAttributesHandlers } from '..';
import ProductAttributes from '@/models/ProductAttributes';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';

const getProductAttributes: ProductAttributesHandlers['getProductAttributes'] = async ({
    res,
    req,
    body
}) => {

    try {
        await dbConnect()

        const _data = await ProductAttributes.find({}).where({ isDeleted: false })
            .populate({
                path: 'organizationId',
                select: 'name_customer code',
                model: Organization
            })
            .populate({
                path: 'productTypeId',
                select: 'name code',
                model: ProductType
            })

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

export default getProductAttributes