import dbConnect from '@/utils/dbConnect';
import type { SettingFlowsHandlers } from '..';
import Flow from '@/models/Flow';
import ProductFlow from '@/models/ProductFlow';
import Participant from '@/models/Participant';

const getFlows: SettingFlowsHandlers['getFlows'] = async ({
    // req,
    res,
    body: { productFlowId }
}) => {

    try {
        await dbConnect()

        const data = await ProductFlow.findOne({
            _id: productFlowId,
        })
            .populate({
                path: 'flow',
                model: Flow,
                populate: {
                    path: 'participantId',
                    model: Participant,
                }
            })

        if (!data) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không tìm thấy quy trình" }],
            });
        }

        return res.status(200).json({
            data: data.flow,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getFlows