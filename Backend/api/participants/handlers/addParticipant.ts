import dbConnect from '@/utils/dbConnect';
import Participant, { ParticipantDocument } from '@/models/Participant';
import type { ParticipantHandlers } from '..';
import validator from "validator";
import cloudinary from 'Backend/middlewares/cloudinary';


// Return all employees info
const addParticipant: ParticipantHandlers['addParticipant'] = async ({
  res,
  req,
  body: { icon, code, address, email, phone, participantName, participantType, participantIsChildOf, organizationId },
  // config,
}) => {
  let result: { data: ParticipantDocument[] } = { data: [] }

  try {
    await dbConnect()

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Email không hợp lệ" }],
      })
    }

    //check email
    const checkEmail = await Participant.find({ email: email })
    if (checkEmail.length > 0) {
      return res.status(401).json({
        data: null,
        errors: [{
          message: 'Email này đã được sử dụng.'
        }]
      })
    };
    //check code
    const checkCode = await Participant.find({ code: code.toUpperCase() }).exec()
    if (checkCode.length > 0) {
      return res.status(401).json({
        data: null,
        errors: [{ message: "Mã code này đã tồn tại." }],
      });
    }

    const url_icon = cloudinary.v2.uploader.upload(icon, {
      folder: `Participant`,
      transformation: [{
        width: 320,
        height: 320
      }],
      format: 'jpg'
    }, (error) => {
      if (error) return error.message
      return 'Unknow Error'
    })

    result.data[0] = await Participant.create({
      icon: (await url_icon).url,
      address: address,
      email: email,
      phone: phone,
      code: code.toUpperCase(),
      participantName: participantName,
      participantType: participantType,
      participantIsChildOf: participantIsChildOf,
      organizationId: organizationId
    });

  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default addParticipant