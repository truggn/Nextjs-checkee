import dbConnect from '@/utils/dbConnect';
import type { HomeCategoryHandlers } from '..';
import HomeCategory from '@/models/HomeCategory';
import UserDocument from '@/models/User'

const updateHomeCategory: HomeCategoryHandlers['updateHomeCategory'] = async ({
    req,
    res,
    body: { id, index, updatedBy}
}) => {
    try {
        await dbConnect()

        const isExistedIndex = await HomeCategory.findOne({ index: index})
        if(isExistedIndex) {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Index dã tồn tại. Vui lòng nhập Index khác"
                }]
            })
        }

        const dataUpdate = await HomeCategory.findOneAndUpdate({ 
            _id: id 
        }, { 
            index: index, 
            updatedBy: updatedBy
        }, { new: true})

        if(dataUpdate) {
            return res.status(200).json({
                data: dataUpdate
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không cập nhật được danh mục này."
                }]
            })
        }
          


    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default updateHomeCategory