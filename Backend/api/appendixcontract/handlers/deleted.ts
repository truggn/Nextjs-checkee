
import dbConnect from '@/utils/dbConnect';
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import type { AppendixContractHandlers } from 'Backend/api/appendixcontract/indexId';

const deleted: AppendixContractHandlers['deleted'] = async ({
    res,
    req,
    body,
}) => {
    try {
        await dbConnect()
        const data = await AppendixContract.findOneAndUpdate({
            _id: req.query.id
        }, { isDeleted: true }, { new: true })
        
        if (data && data.isDeleted) {
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

export default deleted