import dbConnect from '@/utils/dbConnect';
import type { ProductTypeHandlers } from '..';
import ProductType, { ProductTypeDocument } from '@/models/ProductType';
import Organization from '@/models/Organization';
import UserDocument from '@/models/User'
import Category from '@/models/Category'
import CateProducType from '@/models/CategoryProductType'
import cloudinary from 'Backend/middlewares/cloudinary'
import { format } from 'date-fns'

const createProductType: ProductTypeHandlers['createProductType'] = async ({
    res,
    req,
    body: {
        code,
        name,
        organizationId,
        categoryId,
        images,
        price,
        countryOfOrigin,
        description,
        productRepresentation,
        createdBy
    }
}) => {

    try {
        await dbConnect()

        const date = format(new Date(), 'yyyy/MM/dd');

        // check Regex code
        const regex = /^[a-zA-Z0-9_*]+$/;
        const checkRegex = regex.test(code)
        if (checkRegex == false) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Yêu cầu mã code chỉ chứa ký tự chữ cái, số và dấu _'
                }]
            })
        }

        // check code by organization
        const checkCode = await ProductType.find({ code: code.toUpperCase() }).exec()
        if (checkCode.length > 0) {
            return res.status(401).json({
                data: null,
                errors: [{ message: "Mã code này đã tồn tại." }],
            });

        } else {

            const images_cloud = images.map(async item => {

                const result_data = await cloudinary.v2.uploader.upload(item, {
                    folder: `producttype/images/${date}`,
                    format: 'jpg',
                    transformation: [{
                        quality: 'auto',
                        fetch_format: 'auto'
                    }]
                }, (error, result) => {
                    if (error) return error.message
                    if (result) return result
                    return 'Unknow Error'
                });
                // fix size app
                await cloudinary.v2.uploader.upload(item, {
                    transformation: [{
                        height: 320,
                        width: 320,
                        crop: 'pad',
                        quality: 'auto',
                        fetch_format: 'auto',
                    }],
                    public_id: result_data.public_id.concat('_tn')
                }, (error, result) => {
                    if (result) return result
                    if (error) return error.message
                    return 'Unknow Error'
                })

                return result_data;
            });

            const url_images = await Promise.all(images_cloud)

            const result_data = await cloudinary.v2.uploader.upload(productRepresentation, {
                format: 'jpg',
                folder: `producttype/avata/${date}`,
                transformation: [{
                    quality: 'auto',
                    fetch_format: 'auto'
                }]
            }, (error, result) => {
                if (result) return result
                if (error) return error.message
                return 'Unknow Error'
            });
            // fix size app
            await cloudinary.v2.uploader.upload(productRepresentation, {
                transformation: [{
                    width: 320,
                    height: 320,
                    crop: 'pad',
                    quality: 'auto',
                    fetch_format: 'auto'
                }],
                public_id: result_data.public_id.concat('_tn')
            }, (error, result) => {
                if (result) return result
                if (error) return error.message
                return 'Unknow Error'
            });

            // Create new data ProductType
            const _data = await ProductType.create({
                code: code.toUpperCase(),
                name: name,
                organizationId: organizationId,
                categoryId: categoryId,
                productRepresentation: result_data,
                images: url_images,
                price: price,
                countryOfOrigin: countryOfOrigin,
                description: description,
                createdBy: createdBy
            });

            if (_data) {

                const data = await ProductType.find({ _id: _data.id })
                    .populate({
                        path: 'organizationId',
                        select: 'name_customer code',
                        model: Organization
                    })
                    .populate({
                        path: 'createdBy',
                        select: 'firstName lastName',
                        model: UserDocument
                    })
                    .populate({
                        path: 'categoryId',
                        select: 'code name',
                        model: Category
                    })

                await CateProducType.create({
                    categoryID: data[0].categoryId,
                    productTypeID: data[0]._id,
                    createdBy: data[0].createdBy
                }) 
                       
                return res.status(200).json({
                    data: data
                });

            } else {
                return res.status(401).json({
                    data: null,
                    errors: [{
                        message: 'Thêm mới thất bại.'
                    }]
                });
            }
        }
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createProductType