import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '../id';
import ProductType from '@/models/ProductType';



const APINewProductTypeOfOrganization: ProductTypeHandlers['getNewProductTypeOfOrganization'] = async ({
    res,
    req,
    body: { id }
}) => {

    try {
        await dbConnect()

        const _data = await ProductType.find({
            organizationId: id
        })
            .where({ isDeleted: false })
            .sort({ createdAt: 'desc' })
            .limit(10)
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

export default APINewProductTypeOfOrganization