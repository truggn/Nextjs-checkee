import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '../detail';
import ProductType from '@/models/ProductType';
import Organization from '@/models/Organization';


const getDetailProductType: ProductTypeHandlers['getDetailProductType'] = async ({
    res,
    req,
    body: { id }
}) => {

    try {
        await dbConnect()

        const _data = await ProductType.findOne({
            _id: id
        }).where({ isDeleted: false })
            .populate({
                path: 'organizationId',
                select: 'name_customer phone fax address taxCode icon',
                model: Organization
            })
        if (_data) return res.status(200).json({
            data: _data,
        });
        else return res.status(401).json({
            data: null,
            errors: [{ message: `Không tìm thấy sản phẩm này.` }]
        })
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getDetailProductType