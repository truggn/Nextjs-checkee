import dbConnect from '@/utils/dbConnect';
import UploadFile, { UploadFileDocument } from '@/models/UploadFile';
import type { UploadfileHandlers } from 'Backend/api/uploadfile/changestatus';
import Product, { ProductDocument } from '@/models/Product';
const XLSX = require('xlsx');

const changeStatus: UploadfileHandlers['changeStatus'] = async ({
  res,
  req,
  body,
}) => {
  let result: { data: UploadFileDocument[] | null } = { data: null }
  try {
    await dbConnect()
    const _Data = await UploadFile.findOneAndUpdate({
      _id: body.id,
      isDeleted: false,
    }, {
      $set: {
        status: 2
      }

    }, { new: true })

    if (!_Data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "cập nhật trạng thái không thành công" }]
      })
    }

    if (_Data.status === 2) {
      let workbook = XLSX.readFile(_Data.path, { cellDates: true });
      let data = workbook.Sheets["Sheet1"]
      let data_json = XLSX.utils.sheet_to_json(data)
      let data_Product: ProductDocument[] = []

      await Promise.all(data_json.map(async (_element) => {
        const _product = await Product.findOne({
          code: _element.code
        })
        if (_product !== null) {
          data_Product.push(_product)
        }
        return data_Product
      }))
      if (data_Product.length > 0) {
        const dataCode: string[] = []
        for (let i = 0; i < data_Product.length; i++) {
          dataCode.push(data_Product[i].code)
        }
        return res.status(400).json({
          data: null,
          errors: [{ message: `Mã sản phẩm đã tồn tại: ${dataCode.toString()}` }]
        })
      } else {
        await Promise.all(data_json.map(async (element: any) => {
          await Product.create([{
            code: element.code, name: element.name,
            productTypeId: body.ProductType, createBy: body.createBy
          }])
        }))
        if (!result.data) {
          return res.status(400).json({
            data: null,
            errors: [{ message: "cập nhật trạng thái không thành công" }]
          })
        }
        else {
          return res.status(200).json({
            data: result.data,
          })
        }
      }
    }

  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
}

export default changeStatus