import dbConnect from '@/utils/dbConnect';
import Organization, { OrganizationDocument } from '@/models/Organization';
import type { CustomerHandlers } from 'Backend/api/customer/indexId';
import { format } from 'date-fns'
import cloudinary from 'Backend/middlewares/cloudinary'
import validator from "validator";
// Return all employees info
const updateCustomer: CustomerHandlers['updateCustomer'] = async ({
    res,
    req,
    body: { account_number, address, bank, certificate_image, email,
        fax, icon, name_customer, phone, taxCode }
}) => {
    let result: { data?: OrganizationDocument } = {}
    const update = req.body.update

    try {
        await dbConnect();

        const date = format(new Date(), 'yyyy/MM/dd');

        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Email không hợp lệ" }],
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

        const chkContract = await Organization.findOne({
            _id: req.query.id,
        })

        if (!chkContract) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "ko tìm thấy Contract" }]
            })
        }

        const updatedOrg = await Organization.findOneAndUpdate({
            _id: req.query.id,
        }, {
            name_customer: name_customer,
            account_number: account_number,
            address: address,
            bank: bank,
            certificate_image: urls_certificate,
            fax: fax,
            phone: phone,
            taxCode: taxCode,
            icon: url_image.url,
            email: email
        }, { new: true })

        if (!updatedOrg) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "cập nhật ko thành công" }]
            })
        } else {
            result.data = updatedOrg

            return res.status(200).json({
                data: result.data,
                errors: [{ message: " cập nhật thành công" }]
            })
        }

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }]
        })
    }
}

export default updateCustomer