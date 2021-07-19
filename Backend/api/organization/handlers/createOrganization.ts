import dbConnect from '@/utils/dbConnect';
import type { OrganizationHandlers } from '..';
import Organization from '@/models/Organization';
import { format } from 'date-fns'
import validator from "validator";
import cloudinary from 'Backend/middlewares/cloudinary'

const createOrganization: OrganizationHandlers['createOrganization'] = async ({
    res,
    req,
    body: {
        code, account_number, address, bank, certificate_image, email,
        fax, icon, name_customer, phone, taxCode }
}) => {

    try {
        await dbConnect()

        //check validator Email
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({
                data: null,
                errors: [{ message: "Email không hợp lệ." }],
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

        const date = format(new Date(), 'yyyy/MM/dd');

        const url_image = await cloudinary.v2.uploader.upload(icon, {
            folder: `Organization/icon/${date}`,
            format: "jpg",
            transformation: [{
                height: 320,
                width: 320,
                crop: 'fill',
                quality: 'auto'
            }
            ]
        }, (error, result) => {
            if (error) return error.message
            else return result
        })

        const certificate_cloud = certificate_image.map(async item => {
            const certificate_url = await cloudinary.v2.uploader.upload(item, {
                folder: `Organization/certificate/${date}`,
                format: "jpg",
                transformation: [{
                    height: 320,
                    width: 320,
                    crop: 'fill',
                    quality: 'auto'
                }
                ]
            }, (error, result) => {
                if (error) return error.message
                else return result
            })
            return certificate_url
        })

        const _certificate = await Promise.all(certificate_cloud)

        await Organization.create({
            code: code,
            account_number: account_number,
            address: address,
            bank: bank,
            certificate_image: _certificate,
            email: email,
            fax: fax,
            name_customer: name_customer,
            phone: phone,
            taxCode: taxCode,
            icon: url_image.url
        })

        const data = await Organization.find();

        return res.status(200).json({
            data: data,
        });

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createOrganization