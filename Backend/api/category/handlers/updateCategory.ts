import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '..';
import Category, { CategoryDocument } from '@/models/Category';
import mongoose from 'mongoose';
import cloudinary from "Backend/middlewares/cloudinary";
import { format } from 'date-fns'




const updateCategory: CategoryHandlers['updateCategory'] = async ({
    req,
    res,
    body: { id, name, description, isHomeCategory, indexHomeCategory, icon, updatedBy }
}) => {

    try {
        await dbConnect()

       
        if (name === null || name === '') {
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

        const date = format(new Date(), 'yyyy/MM/dd');

        
        const _icon = await cloudinary.v2.uploader.upload(icon, {
            format: 'jpg',
                folder: `category/${date}`,
                transformation: [{
                    quality: 'auto',
                    fetch_format: 'auto'
                }]
            }, (error, result) => {
                if (result) return result
                if (error) return error.message
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
            if (result) return result
            if (error) return error.message
            return 'Unknow Error'
        });

        
        const _dataUpdateCategory = await Category.findOneAndUpdate({
            _id: id
        }, {           
            name: name,
            description: description,
            icon: _icon.url,
            isHomeCategory: isHomeCategory,
            indexHomeCategory: indexHomeCategory,
            updatedBy: updatedBy,
            
        }, {new: true})
        if(_dataUpdateCategory) {
            return res.status(200).json({
                data: _dataUpdateCategory
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không cập nhật được danh mục này."
                }]
            })
        }

    }  catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default updateCategory