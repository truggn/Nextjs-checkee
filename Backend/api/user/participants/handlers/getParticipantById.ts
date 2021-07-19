import dbConnect from '@/utils/dbConnect';
import Participant, { ParticipantDocument } from '@/models/Participant';
import type { ParticipantHandlers } from '../id';

// Return all Participants info
const getParticipantById: ParticipantHandlers['getParticipantById'] = async ({
  res,
  req,
  // body,
}) => {
  let result: { data?: ParticipantDocument } = {}

  try {
    await dbConnect()

    const found = await Participant.findOne({
      _id: req.query.id
    }).where({ isDeleted: false })

    if (!found) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'User không tồn tại' }],
      });
    }

    result.data = found
  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }

  return res.status(200).json({ data: result.data ?? null })
}

export default getParticipantById