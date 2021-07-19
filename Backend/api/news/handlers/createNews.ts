import dbConnect from '@/utils/dbConnect';
import type { NewsHandlers } from '..';
import NewsModel, { NewsDocument } from '@/models/News';
import cloudinary from 'Backend/middlewares/cloudinary'
import { format } from 'date-fns'


const createNews: NewsHandlers['createNews'] = async (
    {
        req,
        res,
        body: { title, content, description, images, createdBy }
    }) => {
    try {
        await dbConnect()

        if (title === null || title === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm tiêu đề bài viết.'
                }]
            })
        }

        if (content === null || content === '') {
            return res.status(401).json({
                data: null,
                errors: [{
                    message: 'Hãy thêm nội dung bài viết.'
                }]
            })
        }

        const date = format(new Date(), 'yyyy/MM/dd');

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
        const url_images = await Promise.all(images_cloud);

        const data = {
            title: title,
            content: content,
            description: description,
            images: url_images,
            createdBy: createdBy
        }

        const _dataNews = await NewsModel.create(data)
        if (!_dataNews) return res.status(401).json({
            data: null,
            errors: [{
                message: "không thêm được bài đăng."
            }]
        })
        else return res.status(200).json({
            data: _dataNews
        })

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createNews
