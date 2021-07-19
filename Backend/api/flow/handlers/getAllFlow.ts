import dbConnect from '@/utils/dbConnect';
import Flow, { FlowDocument } from '@/models/Flow';
import type { FlowHandlers } from '..';


// Return all Participants info
const getAllProductFlow: FlowHandlers['getAllFlow'] = async ({
  res,
  // req,
  // body,
  // config,
}) => {
  let result: { data?: FlowDocument[] } = {}

  try {
    await dbConnect()

    result.data = await Flow.find({}).where({ isDeleted: false })
      .sort({
        createdAt: "desc",
      })
      .lean();

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default getAllProductFlow