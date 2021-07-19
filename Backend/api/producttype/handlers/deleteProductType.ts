import dbConnect from '@/utils/dbConnect';
import ProductType from '@/models/ProductType';
import type { ProductTypeHandlers } from '../index';


// Return all Participants info
const deleteProductType: ProductTypeHandlers['deleteProductType'] = async ({
    res,
    req,
    body: { deletedBy, id }
    // config,
}) => {
    try {
        await dbConnect()

        const result = await ProductType.findOneAndUpdate({
            _id: id
        }, {
            isDeleted: true,
            deletedBy: deletedBy
        }, { new: true });

        if (!result) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Xóa bản ghi thất bại." }],
            });
        }

    } catch (error) {
        return res.status(400).json({
            data: null,
            errors: [{ message: error.message, code: "err002" }],
        });
    }

    return res.status(200).json({
        data: null,
        errors: [{ message: "Xóa bản ghi thành công." }],
    });

}

export default deleteProductType