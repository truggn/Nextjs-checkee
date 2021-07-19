import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { HomeCategoryHandlers } from '..';
import Category, { CategoryDocument } from '@/models/Category';
import HomeCategory from '@/models/HomeCategory';
import UserDocument from '@/models/User'


const createHomeCategory: HomeCategoryHandlers['createHomeCategory'] = async ({
    req,
    res,
    body: { category, index, createdBy }
}) => {
    try {
        await dbConnect()
        const dataCategory = await Category.findOne()
            .where({ _id: category})
            
        if(!dataCategory) {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Không tìm thấy danh mục tương ứng'
                }]
            })
        }

        const isExistedIndex = await HomeCategory.findOne({ index: index})
        if(isExistedIndex) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Index dã tồn tại. Vui lòng nhập index khác"
                }]
            })
        }
        

        const data = {
            category: dataCategory._id,
            name: dataCategory.name,
            icon: dataCategory.icon,
            index: index,
            createdBy: createdBy
        }

        const _dataHomeCategory = await HomeCategory.create(data)
        
        if(_dataHomeCategory) {
            const _data = await HomeCategory.findOne({ _id: _dataHomeCategory.id})
                    .populate({
                        path: 'createdBy',
                        select: 'firstName lastName',
                        model: UserDocument
                    })
            if(_data) {
                
                await dataCategory.updateOne({homeCategory: _data.id})
                return res.status(200).json({
                    data: _data
                });
            }
        } else {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Thêm mới thất bại.'
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

export default createHomeCategory