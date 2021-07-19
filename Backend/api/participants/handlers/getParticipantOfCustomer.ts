import dbConnect from '@/utils/dbConnect';
import Participant, { ParticipantDocument } from '@/models/Participant';
import type { ParticipantHandlers } from '../getParticipantOfCustomer';
import participantType from '@/models/ParticipantType'


// Return all Participants info
const getParticipantOfCustomer: ParticipantHandlers['getParticipantOfCustomer'] = async ({
  res,
  req,
  // body,
  // config,
}) => {
  let result: { data?: ParticipantDocument[] } = {}

  try {
    await dbConnect()

    result.data = await Participant.find({
      organizationId: req.query.id,
    }).populate({
      path: 'participantType',
      select: 'name code description',
      model: participantType
    })

    if (!result.data || result.data === null) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'User không tồn tại' }],
      });
    }

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default getParticipantOfCustomer