import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { CategoryHandlers } from '..';
import Category, { CategoryDocument } from '@/models/Category';
import cloudinary from 'Backend/middlewares/cloudinary'
import { format } from 'date-fns'



const createCategory: CategoryHandlers['createCategory'] = async ({
    req,
    res,
    body: { code, 
            name, 
            description, 
            icon, 
            level, 
            isHomeCategory, 
            indexHomeCategory, 
            parentsId, 
            createdBy 
    }
}) => {

    try {
        await dbConnect()

        const date = format(new Date(), 'yyyy/MM/dd');

        const isExistedCode = await Category.findOne({ code: code })

        if (isExistedCode) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Code đã tồn tại, vui lòng nhập code mới cho danh mục'
                }]
            })
        }

        const checkIndexHomeCategory = await Category.findOne({ 
            indexHomeCategory: indexHomeCategory
        })
        if(checkIndexHomeCategory) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Index đã bị trùng lặp'
                }]
            })
        }

        const parentDataLv1 = await Category.findOne({ _id: parentsId['idCategoryLevel_1'] })
        const parentDataLv2 = await Category.findOne({ _id: parentsId['idCategoryLevel_2'] })

        if (level === 2) {
            if (!parentDataLv1) {
                return res.status(401).json({
                    data: null,
                    errors: [{
                        message: 'Không tìm thấy danh mục cha'
                    }]
                })
            }
        }

        if (level === 3) {
            if (!parentDataLv1 || !parentDataLv2) {
                return res.status(401).json({
                    data: null,
                    errors: [{
                        message: 'Không tìm thấy danh mục cha'
                    }]
                })
            }
        }

        const _icon = await cloudinary.v2.uploader.upload(icon, {
            format: 'jpg',
                folder: `category/${date}`,
                transformation: [{
                    quality: 'auto',
                    fetch_format: 'auto'
                }]
            }, (error, result) => {
                if (result) return result
                if (error) return res.status(401).json({
                    data: null,
                    errors: [{
                        message: error.message
                    }]
                })
                return 'Unknow Error'
        });

        await cloudinary.v2.uploader.upload(icon, {
            transformation: [{
                width: 320,
                height: 320,
                crop: 'pad',
                quality: 'auto',
                fetch_format: 'auto'
            }],
            public_id: _icon.public_id.concat('_tn')
        }, (error, result) => {
            if (result) {
                
                return result
            }
            if (error) return res.status(401).json({
                data: null,
                errors: [{
                    message: error.message
                }]
            })
            return 'Unknow Error'
        });
        


        const data = {
            code: code,
            name: name,
            description: description,
            icon: _icon.url,
            level: level,
            isHomeCategory: isHomeCategory,
            indexHomeCategory: indexHomeCategory,
            parentsId: parentsId,
            createdBy: createdBy,
        }

        if (code === null || code === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm code cho mục này.'
                }]
            })
        } if (name === null || name === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm tên cho mục này.'
                }]
            })
        } if (description === null || description === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm mô tả.'
                }]
            })
        } if (level === null) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm cấp cho danh mục này.'
                }]
            })
        }

        const _dataCategory = await Category.create(data)

        let subId: mongoose.Schema.Types.ObjectId[] = []

        subId.push(_dataCategory._id)


        if (parentDataLv1 && _dataCategory.level === 2) {
            const currentSubId: mongoose.Schema.Types.ObjectId[] = parentDataLv1.subcategoryId
            currentSubId.push(...subId)
            await parentDataLv1.updateOne({ subcategoryId: currentSubId }, { new: true })
        }

        if (parentDataLv2 && _dataCategory.level === 3) {
            const currentSubId: mongoose.Schema.Types.ObjectId[] = parentDataLv2.subcategoryId
            currentSubId.push(...subId)
            await parentDataLv2.updateOne({ subcategoryId: currentSubId }, { new: true })
        }

        if (_dataCategory) {
            const data = await Category.findOne({ _id: _dataCategory.id })

            return res.status(200).json({
                data: data
            });
        } else {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'thêm mới không thành công.'
                }]
            });
        }


    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createCategory