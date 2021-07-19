
import Organization from '@/models/Organization';
import ProductType from '@/models/ProductType';
import Product from '@/models/Product';
import ProductRequest, { ProductRequestDocument } from '@/models/ProductRequest';
import dbConnect from '@/utils/dbConnect';
import { ProductRequetsHandlers } from '../id';
import User from '@/models/User';
import ProductNBP from '@/models/ProductNBP';
import ProductNBF from '@/models/ProductNBF';
const confirmProductRequest: ProductRequetsHandlers['confirmProductRequest'] = async ({
    res,
    req,
    body: { id, status }
}) => {
    try {
        await dbConnect();
        //check confirmed
        let check: any;
        check = await ProductRequest.findOne({ _id: id })
        if (check.status === 'INIT') {
            const data = await ProductRequest.findOneAndUpdate({ _id: id }, { status: 'CONFIRMED' }, { new: true })
                .populate({
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
            if (!data) {
                return res.status(401).json({
                    data: null,
                    errors: [{
                        message: 'Confirm Request Unsucessfull!'
                    }]
                })
            } else {
                for (let i = 0; i < data.products.length; i++) {
                    const _product = await Product.create({
                        productTypeId: data.productTypeId,
                        organizationId: data.organizationId,
                        code: data.products[i].code,
                        name: data.products[i].name,
                        createBy: data.createdBy
                    });
                    await ProductNBF.create({
                        code: data.products[i].code,
                        name: data.products[i].name,
                        productTypeId: data.productTypeId,
                        organizationId: data.organizationId,
                        productId: _product._id
                    })

                    await ProductNBP.remove({ productId: data.products[i]._id })
                }
                return res.status(200).json({
                    data: data
                })
            }

        } else {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: "Sản phẩm này đã được duyệt."
                }]
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            data: null,
            errors: [{
                message: error.message
            }]
        })
    }
}
export default confirmProductRequest