
import dbConnect from '@/utils/dbConnect';
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import SystemPage from '@/models/SystemPage'
import type { SystemUserTypePageHandlers } from '..';
import { da } from 'date-fns/locale';
const getAll: SystemUserTypePageHandlers['getAll'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data?: SystemUserTypePageDocument[] } = {}
  try {
    await dbConnect()
    let data
    data = await SystemUserTypePage.find().sort({
      createdAt: "desc",
    })

    data = await Promise.all(data.map(async element => {
      element.parentId = await SystemPage.findOne({
        _id: element.parentId
      }).populate({
        path: 'parentId'
      })
      return element
    }))

    if (!data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "ko tìm thấy dữ liệu" }]
      })
    } else {
      return res.status(200).json({
        data: data
      })
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }


  //  return res.status(200).json({ data:data ?? null
  //   })
}

export default getAll