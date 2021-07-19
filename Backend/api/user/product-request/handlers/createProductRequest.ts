import dbConnect from '@/utils/dbConnect';
import type { ProductRequetsHandlers } from '..';
import ProductRequest from '@/models/ProductRequest';
import ProductNBP from '@/models/ProductNBP';
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType'
import User from '@/models/User'

const createProductRequest: ProductRequetsHandlers['createProductRequest'] = async ({
    res,
    // req,
    body: { filename, organizationId, productTypeId, products, createdBy }
}) => {
    try {
        await dbConnect();

        const _data = await ProductRequest.create({
            filename,
            organizationId,
            productTypeId,
            products,
            createdBy,
        })

        if (_data) {

            for (let i = 0; i < _data.products.length; i++) {
                await ProductNBP.create({
                    organizationId: _data.organizationId,
                    productTypeId: _data.productTypeId,
                    code: _data.products[i].code,
                    name: _data.products[i].name,
                    productId: _data.products[i]._id
                })
            }

            const newProductRequest = await ProductRequest.findById({ _id: _data.id })
                .populate({
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

            return res.status(200).json({
                data: newProductRequest
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{ message: 'Không tạo được' }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createProductRequest