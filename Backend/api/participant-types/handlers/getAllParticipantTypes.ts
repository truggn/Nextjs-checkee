import dbConnect from '@/utils/dbConnect';
import ParticipantType, { ParticipantTypeDocument } from '@/models/ParticipantType';
import type { ParticipantTypesHandlers } from '..';

// Return all ParticipantTypes
const getAllParticipantTypes: ParticipantTypesHandlers['getAllParticipantTypes'] = async ({
    // req,
    res,
    // body,
    // config,
}) => {
    let result: { data: ParticipantTypeDocument[] } = { data: []}

    try {
        await dbConnect()

        result.data = await ParticipantType.find({})
            .sort({ createdAt: "desc", })
            .lean();
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message, }],
        });
    }

    return res.status(200).json({ data: result.data })
}

export default getAllParticipantTypes