import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '../verified';
import ProductType from '@/models/ProductType';

//
const verifiedProductType: ProductTypeHandlers['verifiedProductType'] = async ({
    res,
    req,
    body: { id, verifiedBy }
    // config,
}) => {

    try {
        await dbConnect()
        if (id) {
            await ProductType.updateMany(
                { _id: id },
                { verified: true, verifiedBy: verifiedBy },
                { new: true }
            )

            const _findData = await ProductType.find({ _id: id })

            if (_findData) return res.status(200).json({ data: _findData })

            else return res.status(400).json({ data: null, errors: [{ message: 'verified unsuccesful.' }] })

        } else {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: "không tìm thấy sản phẩm."
                }]
            })
        }
    } catch (error) {
        return res.status(400).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}


export default verifiedProductType