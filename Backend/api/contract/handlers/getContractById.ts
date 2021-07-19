
import dbConnect from '@/utils/dbConnect';
import Contract, { ContractDocument } from '@/models/Contract';
import type { ContractHandlers } from 'Backend/api/contract/indexId';

const getContractById: ContractHandlers['getContractById'] = async ({
    res,
    req,
    body,
}) => {
    await dbConnect();
    let result: { data: ContractDocument | null } = { data: null }
    try {
        result.data = await Contract.findById(req.query.id).where({ isDeleted: false })
        if (!result.data) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "không tìm thấy SystemPage" }]
            })
        } else {
            return res.status(200).json({
                data: result.data,
            })
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }]
        })
    }
}

export default getContractById