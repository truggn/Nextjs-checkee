import dbConnect from '@/utils/dbConnect';
import type { SettingProductFlowHandlers } from '../indexid';
import Flow from '@/models/Flow';
import ProductAttributes from '@/models/ProductAttributes';
import ProductFlow from '@/models/ProductFlow';
import Participant from '@/models/Participant';

const getProductFlow: SettingProductFlowHandlers['getProductFlow'] = async ({
    // req,
    res,
    body: { id }
}) => {

    try {
        if (!id) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "id is required" }],
            });
        }

        await dbConnect()

        const data = await ProductFlow.findOne({
            _id: id
        })
            .populate({
                path: 'flow',
                model: Flow,
                populate: [{
                    path: 'productAttributes',
                    model: ProductAttributes,
                }, {
                    path: 'participantId',
                    model: Participant,
                }],
            })

        if (!data) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không tìm thấy quy trình" }],
            });
        }

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

export default getProductFlow