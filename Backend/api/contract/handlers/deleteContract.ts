
import dbConnect from '@/utils/dbConnect';
import Contract, { ContractDocument } from '@/models/Contract';
import type { ContractHandlers } from 'Backend/api/contract/indexId';

const deleteContract: ContractHandlers['deleteContract'] = async ({
    res,
    req,
    body,
}) => {
    try {
        await dbConnect()

        await Contract.findOneAndUpdate({
            _id: req.query.id
        }, { isDeleted: true }, { new: true })

        const chkContract = await Contract.findOne({
            _id: req.query.id
        })

        if (chkContract && chkContract.isDeleted) {
            return res.status(200).json({
                data: null,
                errors: [{ message: "xóa thành công" }]
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{ message: "xóa không thành công" }]
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default deleteContract