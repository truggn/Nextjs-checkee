import dbConnect from '@/utils/dbConnect';
import Product from '@/models/Product';
import type { ProductHandlers, resultBody } from '..';

const updateProductInformation: ProductHandlers['updateProductInformation'] = async ({
    req,
    res,
    body: { products }
}) => {    
    try {
        await dbConnect()

        const result: resultBody = {
            numberSuccess: 0,
            numberFalse: 0,
        }

        for (let i = 0; i < products.length; i++) {
            const {ma_sp, ...productWithoutCode} = products[i]

            let updated = await Product.updateOne({
                code: ma_sp
            }, {
                $set: productWithoutCode
            });

            if (updated.ok === 1 && updated.n > 0) {
                result.numberSuccess++
            } else {
                result.numberFalse++
            }            
        }

        if (result.numberSuccess === 0) {
            return res.status(400).json({
                data: result,
                errors: [{ message: "Thêm mới không thành công" }]
            })
        }

        if (result.numberSuccess < products.length) {
            return res.status(200).json({
                data: result,
                errors: [{ message: `Thêm mới không thành công ${result.numberFalse} sản phẩm` }]
            })
        }

        return res.status(200).json({
            data: result
        })
        
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default updateProductInformation