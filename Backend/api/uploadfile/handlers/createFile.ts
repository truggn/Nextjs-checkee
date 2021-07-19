import dbConnect from '@/utils/dbConnect';
import UploadFile, { UploadFileDocument } from '@/models/UploadFile';
import type { UploadfileHandlers } from '..';
const XLSX = require('xlsx');

const createFile: UploadfileHandlers['createFile'] = async ({
  // req,
  res,
  body,
}) => {
  let result: { data: UploadFileDocument[] | null } = { data: null }

  try {
    await dbConnect()

    if (!body.path) return res.status(400).json({
      data: null,
      errors: [{ message: "Khong upload duoc" }]
    })

    const datafile = await UploadFile.create([
      {
        fileName: body.fileName,
        path: body.path,
        date: body.date,
        status: body.status,
        createdBy: body.createdBy,
      }
    ])

    if (!datafile) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "tạo mới không thành công" }]
      })
    } else {
      return res.status(200).json({
        data: result.data,
        errors: [{ message: "tạo mới thành công" }]
      })
    }

  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
}

export default createFile