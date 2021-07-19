import dbConnect from '@/utils/dbConnect';
import Product, { ProductDocument } from '@/models/Product';
import type { ProductHandlers } from '..';
const XLSX = require('xlsx');
// import XLSX from 'xlsx';
// const formidable = require('formidable');
// import formidable from 'formidable';
// const { IncomingForm } = require('formidable');
// import { IncomingForm } from 'formidable';

const create: ProductHandlers['create'] = async ({
  // req,
  res,
  body: { filePath, createBy },
}) => {
  let result: { data: ProductDocument[] | null } = { data: null }
  try {
    await dbConnect()

    if (!filePath) return res.status(400).json({
      data: null,
      errors: [{ message: "Khong upload duoc" }]
    })

    let workbook = XLSX.readFile(filePath, { cellDates: true });
    let data = workbook.Sheets["Sheet1"]
    // TODO: Sửa lại type sheet_to_json<T>
    // let data_json = XLSX.utils.sheet_to_json<T>(data)
    let data_json = XLSX.utils.sheet_to_json(data)
    let _data

    await Promise.all(data_json.map(async (element: any) => {
      _data = await Product.create([{
        code: element.code, name: element.name, weight: element.weight, color: element.color,
        date: element.date, createBy: createBy
      }])
      return _data
    }))
    if (!_data) {
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

export default create