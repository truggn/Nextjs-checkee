import dbConnect from '@/utils/dbConnect';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { CustomerHandlers } from '..';
import validator from "validator";
import { format } from 'date-fns'
import cloudinary from 'Backend/middlewares/cloudinary'

// Create new customer
const addCustomer: CustomerHandlers['addCustomer'] = async ({
  res,
  req,
  body: {
    code, account_number, address, bank, certificate_image, email,
    fax, icon, name_customer, phone, taxCode }
  // config,
}) => {
  let result: { data: OrganizationDocument[] } = { data: [] }

  try {
    await dbConnect()

    const date = format(new Date(), 'yyyy/MM/dd');

    if (!email || !validator.isEmail(email)) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Email không hợp lệ" }],
      })
    }
    //check Email da su dung.
    const checkEmail = await Organization.find({ email: email })
    if (checkEmail.length > 0) {
      return res.status(401).json({
        data: null,
        errors: [{
          message: 'Email này đã được sử dụng.'
        }]
      })
    }

    const url_image = await cloudinary.v2.uploader.upload(icon, {
      folder: `Organization/icon/${date}`,
      format: "jpg",
      transformation: [{
        height: 320,
        width: 320,
        crop: 'fill'
      }
      ]
    }, (error, result) => {
      if (error) return error.message
      else return result
    })

    const cloud_certificate = certificate_image.map(async item => {
      const _certificate = await cloudinary.v2.uploader.upload(item, {
        folder: `Organization/certificate/${date}`,
        format: "jpg",
        transformation: [{
          height: 320,
          width: 320,
          crop: 'fill'
        }
        ]
      }, (error, result) => {
        if (error) return error.message
        else return result
      })
      return _certificate.url
    })

    const urls_certificate = await Promise.all(cloud_certificate)

    const data = await Organization.create({
      code: code,
      account_number: account_number,
      address: address,
      bank: bank,
      certificate_image: urls_certificate,
      email: email,
      fax: fax,
      name_customer: name_customer,
      phone: phone,
      taxCode: taxCode,
      icon: url_image.url
    });

    // Chỉ dùng được khi tạo một document
    data.populate({
      path: 'productTypeId',
      select: 'name code',
    })
      .populate({
        path: 'organizationId',
        select: 'name_customer code',
      })
      .execPopulate()

    result.data[0] = data

  } catch (error) {
    return res.status(400).json({
      data: null,
      errors: [{ message: error.message, code: "err002" }],
    });
  }


  return res.status(200).json({ data: result.data ?? null })
}

export default addCustomer