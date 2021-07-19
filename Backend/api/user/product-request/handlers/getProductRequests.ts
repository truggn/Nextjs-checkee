import dbConnect from '@/utils/dbConnect';
import type { ProductRequetsHandlers } from '..';
import ProductRequest from '@/models/ProductRequest';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType'
import User from '@/models/User'

const getProductRequests: ProductRequetsHandlers['getProductRequests'] = async ({
    res,
    // req,
    // body
}) => {
    try {
        await dbConnect();

        const productRequests = await ProductRequest.find().populate({
            path: 'organizationId',
            select: 'name_customer code',
            model: Organization
        })
            .populate({
                path: 'productTypeId',
                select: 'name code',
                model: ProductType
            }).populate({
                path: 'createdBy',
                select: 'email',
                model: User
            })
        if (productRequests) {
            return res.status(200).json({
                data: productRequests
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'Không tìm được' }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getProductRequests