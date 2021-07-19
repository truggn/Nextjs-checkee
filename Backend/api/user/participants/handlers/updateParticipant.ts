import dbConnect from '@/utils/dbConnect';
import Participant, { ParticipantDocument } from '@/models/Participant';
import type { ParticipantHandlers } from '..';
import { format } from 'date-fns'
import cloudinary from 'Backend/middlewares/cloudinary';

const updateParticipant: ParticipantHandlers['updateParticipant'] = async ({
  res,
  req,
  body: { icon, address, phone, participantName, participantType, organizationId },
}) => {
  let result: { data: ParticipantDocument[] } = { data: [] }

  try {
    await dbConnect()

    const date = format(new Date(), 'yyyy/mm/dd')

    const userID = req.body.userID;


    if (!userID) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'userID không xác định' }],
      });
    }

    const url_icon = cloudinary.v2.uploader.upload(icon, {
      folder: `participant/${date}`,
      transformation: [{
        width: 320,
        height: 320
      }],
      format: 'jpg'
    }, (error) => {
      if (error) return error.message
      return 'Unknow Error'
    })

    const _user = await Participant.findOneAndUpdate({
      _id: userID,
    }, {
      icon: (await url_icon).url,
      address: address,
      phone: phone,
      participantName: participantName,
      participantType: participantType,
      organizationId: organizationId

    }, { new: true });

    if (!_user) {
      return res.status(400).json({
        data: null,
        errors: [{ message: 'User không tồn tại' }],
      });
    }

    result.data[0] = _user;


  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }

  return res.status(200).json({
    data: result.data,
    errors: [{ message: 'Cập nhật thành công.' }],
  });


}


export default updateParticipant