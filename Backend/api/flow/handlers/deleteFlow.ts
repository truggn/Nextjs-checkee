import dbConnect from '@/utils/dbConnect';
import Flow, { FlowDocument } from '@/models/Flow';
import type { FlowHandlers } from '../id';
import ProductFlow from '@/models/ProductFlow';


// Return all Participants info
const deleteFlow: FlowHandlers['deleteFlow'] = async ({
    res,
    req,
    // body,
    // config,
}) => {
    let result: { data?: FlowDocument } = {}

    try {
        await dbConnect()

        const _flow = await Flow.findOne({
            _id: req.query.id
        })
            .populate({
                path: 'productFlowId',
                select: 'flow',
                model: ProductFlow
            })

        if (!_flow) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không tìm thấy quy trình đối tượng" }],
            });
        }

        const flow: any = []
        await Promise.all(_flow.productFlowId.flow.map(async element => {
            if (element.toString() != req.query.id) {
                flow.push(element.toString())
            }
        }))

        const result = await Flow.findOneAndUpdate({
            _id: req.query.id
        }, { isDeleted: true }, { new: true });

        if (!result) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Không tìm thấy bản ghi" }],
            });
        }

        if (!result.isDeleted) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Xóa bản ghi thất bại" }],
            });
        } else {

            await ProductFlow.findOneAndUpdate({
                _id: _flow.productFlowId._id,
            }, {
                $set: {
                    flow: flow
                }
            }, { new: true });

            return res.status(200).json({
                data: null,
                errors: [{ message: "Xóa bản ghi thành công" }],
            });
        }

    } catch (error) {
        return res.status(400).json({
            data: null,
            errors: [{ message: error.message, code: "err002" }],
        });
    }



}

export default deleteFlow