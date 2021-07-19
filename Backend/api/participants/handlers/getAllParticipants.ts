import dbConnect from '@/utils/dbConnect';
import Participant, { ParticipantDocument } from '@/models/Participant';
import type { ParticipantHandlers } from '..';
import participantType from '@/models/ParticipantType'


// Return all Participants info
const getAllParticipants: ParticipantHandlers['getAllParticipants'] = async ({
  res,
  // req,
  // body,
  // config,
}) => {
  let result: { data?: ParticipantDocument[] } = {}

  try {
    await dbConnect()

    result.data = await Participant.find({})
      .where('participantName').ne(null).where({ isDeleted: false })
      .sort({
        createdAt: "desc",
      })
      .populate({
        path: 'participantType',
        select: 'description',
        model: participantType
      }).lean()


  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default getAllParticipants