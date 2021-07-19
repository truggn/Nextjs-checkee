import dbConnect from '@/utils/dbConnect';
import type { NewsHandlers } from '..';
import News from '@/models/News'
import cloudinary from 'Backend/middlewares/cloudinary'
import { format } from 'date-fns'


const updateNews: NewsHandlers['updateNews'] = async ({
    res,
    req,
    body: { id, title, content, description, images, updatedBy }
}) => {

    try {
        await dbConnect();

        const date = format(new Date(), 'yyyy/MM/dd');

        if (title === null || title === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm tiêu đề bài viết.'
                }]
            })
        }

        if (content == null || content == '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm nội dung bài viết.'
                }]
            })
        }
        // array public_id
        const public_ids: string[] = []

        const _data = await News.findOne({ _id: id })
        if (_data) {
            for (let i = 0; i < _data.images.length; i++) {
                // lấy public_id để xóa
                public_ids.push(_data.images[i].public_id, _data.images[i].public_id.concat('_tn'))
            }
        }

        const images_cloud = images.map(async item => {

            const url_img = await cloudinary.v2.uploader.upload(item, {
                folder: `news/${date}`,
                transformation: [{
                    quality: 'auto',
                    fetch_format: 'auto'
                }],
                format: 'png'
            }, (error, result) => {
                if (result) return result
                if (error) return error.message
                return 'Unknow Error'
            })

            await cloudinary.v2.uploader.upload(item, {
                transformation: [{
                    width: 600,
                    quality: 'auto',
                    fetch_format: 'auto',
                    crop: 'pad'
                }],
                format: 'png',
                public_id: url_img.public_id.concat('_tn')
            }, (error, result) => {
                if (result) return result
                if (error) return error.message
                return 'Unknow Error'
            });

            return url_img;

        });
        const url_images: any = await Promise.all(images_cloud);

        const _dataNews = await News.findOneAndUpdate({
            _id: id
        }, {
            title: title,
            content: content,
            description: description,
            images: url_images,
            updatedBy: updatedBy
        }, { new: true });

        if (_dataNews) {
            // Nếu người dùng update thành công thì thực hiện xóa hình cũ trên cloudinary.
            public_ids.map(async item => {
                await cloudinary.v2.uploader.destroy(item, (error, result) => {
                    if (error) return error.message
                    if (result) return result
                    return 'Unknow Error'
                })
            })

            return res.status(200).json({
                data: _dataNews
            })
        } else {
            return res.status(400).json({
                data: null,
                errors: [{
                    message: "Không cập nhật được bài đăng."
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

export default updateNews