import dbConnect from '@/utils/dbConnect';
import ProductFlow from '@/models/ProductFlow';
import type { ProductFlowHandlers } from '../id';

const deleteProductFlow: ProductFlowHandlers['deleteProductFlow'] = async ({
    res,
    req,
    // body,
}) => {
    try {
        await dbConnect()

        const result = await ProductFlow.findOneAndUpdate({
            _id: req.query.id
        }, { isDeleted: true }, { new: true });

        if (!result || !result.isDeleted) {
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

export default deleteProductFlow