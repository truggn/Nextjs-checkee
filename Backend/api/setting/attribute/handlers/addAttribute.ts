import dbConnect from '@/utils/dbConnect';
import type { SettingAttributeHandlers } from '..';
import Flow from '@/models/Flow';
import ProductFlow from '@/models/ProductFlow';
import Participant from '@/models/Participant';
import ProductAttributes from '@/models/ProductAttributes';


const addAttribute: SettingAttributeHandlers['addAttribute'] = async ({
    // req,
    res,
    body: { flowId, productAttributeId, }
}) => {

    try {
        await dbConnect()

        const data = await Flow.updateOne(
            {_id: flowId},
            {$push: {productAttributes: productAttributeId}}
        )

        if (data.nModified = 0) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không thêm được đối tượng vào quy trình" }],
            });
        }

        const returnData = await ProductAttributes.findOne({
            _id: productAttributeId
        })

        return res.status(200).json({
            data: returnData,
        });
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default addAttribute