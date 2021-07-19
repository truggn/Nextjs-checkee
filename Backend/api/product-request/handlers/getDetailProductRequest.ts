import dbConnect from '@/utils/dbConnect';
import type { ProductRequetsHandlers } from '../id';
import ProductRequest from '@/models/ProductRequest';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType'
import User from '@/models/User'

const getDetailProductRequests: ProductRequetsHandlers['getDetailProductRequest'] = async ({
    res,
    req,
    // body
}) => {
    try {
        await dbConnect();

        const _dataDetail = await ProductRequest.findOne({ _id: req.query.id })
        if (_dataDetail) {
            return res.status(200).json({
                data: _dataDetail
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'Không tìm thấy data.' }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getDetailProductRequests