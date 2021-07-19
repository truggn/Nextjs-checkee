import dbConnect from '@/utils/dbConnect';
import mongoose from 'mongoose';
import type { HomeCategoryHandlers } from '..';
import HomeCategory from '@/models/HomeCategory';
import UserDocument from '@/models/User'

const getDataHomeCategory: HomeCategoryHandlers['getDataHomeCategory'] = async ({
    req, res, body
}) => {
    try {
        await dbConnect()
        const _data = await HomeCategory.find()
            .where({ isDeleted: false })
            .sort({ createdAt: 'desc'})
            .populate({
                path: 'createdBy',
                select: 'firstName lastName',
                model: UserDocument
            })
        if (!_data) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không tải được dữ liệu danh mục."
                }]
            })
        }
        return res.status(200).json({
            data: _data,
        });

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default getDataHomeCategory