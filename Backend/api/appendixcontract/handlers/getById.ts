
import dbConnect from '@/utils/dbConnect';
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import type { AppendixContractHandlers } from 'Backend/api/appendixcontract/indexId';

const getById: AppendixContractHandlers['getById'] = async ({
    res,
    req,
    body,
}) => {
    await dbConnect();
    let result: { data: AppendixContractDocument | null } = { data: null }
    try {
        result.data = await AppendixContract.findById(req.query.id).where({ isDeleted: false })
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

export default getById