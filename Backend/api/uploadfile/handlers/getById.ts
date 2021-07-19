import dbConnect from '@/utils/dbConnect';
import UploadFile, { UploadFileDocument } from '@/models/UploadFile';
import type { UploadfileHandlers } from 'Backend/api/uploadfile/indexId';
const XLSX = require('xlsx');


const getById : UploadfileHandlers['getById'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data: UploadFileDocument | null } = { data: null }
  try {
    await dbConnect()
    result.data = await UploadFile.findById({ 
        _id : req.query.id
    })

    if(!result.data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "ko tìm thấy file" }]
      })
    }

    let workbook = XLSX.readFile(result.data.path, { cellDates: true });
      let data = workbook.Sheets["Sheet1"]
      let data_json = XLSX.utils.sheet_to_json(data)
      if(!data_json){
        return res.status(400).json({
            data: null,
            errors: [{ message: "ko tìm thấy file" }]
          })
      }else{
        return res.status(200).json({
            data: data_json,
          })
      }
  
    
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{message: error.message}],
    });
  }
}

export default getById