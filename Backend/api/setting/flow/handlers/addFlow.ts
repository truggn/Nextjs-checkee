import dbConnect from '@/utils/dbConnect';
import type { SettingFlowHandlers } from '..';
import Flow from '@/models/Flow';
import ProductFlow from '@/models/ProductFlow';
import Participant from '@/models/Participant';


const addFlow: SettingFlowHandlers['addFlow'] = async ({
    // req,
    res,
    body: { productFlowId, participantId, createdBy, }
}) => {

    try {
        await dbConnect()

        const data = await Flow.create({
            productFlowId,
            participantId,
            createdBy,
        })

        if (!data) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không thêm được đối tượng vào quy trình" }],
            });
        }

        data.populate({
            path: 'participantId',
            select: '-icon',
            model: Participant
        })
            .execPopulate()

        await ProductFlow.updateOne(
            {
                _id: productFlowId
            },
            {
                $push: { flow: data._id }
            }
        )

        return res.status(200).json({
            data: data,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default addFlow