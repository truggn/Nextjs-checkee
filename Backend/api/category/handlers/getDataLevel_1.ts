import dbConnect from '@/utils/dbConnect';
import type { CategoryHandlers } from '../index_level1';
import CategoryModel, { CategoryDocument } from '@/models/Category';
import mongoose from 'mongoose';

const getDataLevel_1: CategoryHandlers['getDataLevel_1'] = async ({
    req, res, body
}) => {
    try {

        await dbConnect()
        const _dataLevel_1 = await CategoryModel.find()
        .where({ isDeleted: false, 
                level: 1
                
        })
        .sort({ createdAt: 'desc'})

        const nonEmptyLevel_1: CategoryDocument[] = _dataLevel_1.filter( item => {
            return item.subcategoryId.length > 0
        })
       

        if (!nonEmptyLevel_1) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không tải được dữ liệu bài viết."
                }]
            })
        }
        return res.status(200).json({
            data: nonEmptyLevel_1,
        });

    }  catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
} 

export default getDataLevel_1