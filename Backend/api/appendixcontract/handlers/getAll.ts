
import dbConnect from '@/utils/dbConnect';
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import type { AppendixContractHandlers } from '..';

const getAll: AppendixContractHandlers['getAll'] = async ({
    res,
    req,
    body,
}) => {
    await dbConnect();
    let result: { data?: AppendixContractDocument[] } = {}
    try {
        result.data = await AppendixContract.find().where({ isDeleted: false }).sort({
            createdAt: "desc",
        }).lean();
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }]
        })
    }
    return res.status(200).json({ data: result.data ?? null })

}

export default getAll