import dbConnect from '@/utils/dbConnect';
import type { SettingAttributesHandlers } from '..';
import Flow from '@/models/Flow';
import ProductAttributes from '@/models/ProductAttributes';

const getAttributes: SettingAttributesHandlers['getAttributes'] = async ({
    // req,
    res,
    body: { flowId }
}) => {

    try {
        if (!flowId) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "flowId is required" }],
            });
        }

        await dbConnect()

        const data = await Flow.findOne({
            _id: flowId
        })
            .populate({
                path: 'productAttributes',
                model: ProductAttributes
            })

        if (!data) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không tìm thấy đối tượng" }],
            });
        }

        return res.status(200).json({
            data: data.productAttributes,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getAttributes