import dbConnect from '@/utils/dbConnect';
import type { ProductAttributesHandlers } from '..';
import ProductAttributes from '@/models/ProductAttributes';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';

const createProductAttributes: ProductAttributesHandlers['createProductAttributes'] = async ({
    res,
    req,
    body
}) => {
    try {
        await dbConnect()

        const { organizationId, code } = req.body
        const regex = /^[a-zA-Z0-9_*]+$/;
        const checkRegex = regex.test(code)
        if (checkRegex == false) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: 'Yêu cầu mã code chỉ chứa ký tự chữ cái, số và dấu _'
                }]
            })
        }
        const checkCode = await ProductAttributes.findOne({ organizationId: organizationId, code: code })
        if (checkCode) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Đã trùng mã code, vui lòng nhập code khác!'
                }]
            })
        } else {

            await ProductAttributes.create(body)

            const data = await ProductAttributes.find()
                .populate({
                    path: 'organizationId',
                    select: 'name_customer code',
                    model: Organization
                })
                .populate({
                    path: 'productTypeId',
                    select: 'name code',
                    model: ProductType
                });

            return res.status(200).json({
                data: data,
            });

        }

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createProductAttributes