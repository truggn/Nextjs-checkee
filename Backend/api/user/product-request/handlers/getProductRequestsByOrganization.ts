import dbConnect from '@/utils/dbConnect';
import type { ProductRequetsHandlers } from '../getByOrganization';
import ProductRequest, { ProductRequestDocument } from '@/models/ProductRequest';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType'
import User from '@/models/User'


const getProductRequestsByOrganization: ProductRequetsHandlers['getProductRequestsByOrganization'] = async ({
    res,
    req,
    // body
}) => {

    let result: { data?: ProductRequestDocument[] } = {}
    try {
        await dbConnect();

        result.data = await ProductRequest.find({
            organizationId: req.query.id,
        }).populate({
            path: 'organizationId',
            select: 'name_customer code',
            model: Organization
        }).populate({
            path: 'productTypeId',
            select: 'name code',
            model: ProductType
        }).populate({
            path: 'createdBy',
            select: 'email',
            model: User
        })
        if (!result.data || result.data === null) {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'Không tìm được dữ liệu.' }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
    return res.status(200).json({ data: result.data ?? null })
}

export default getProductRequestsByOrganization