import type { ImageCkeditorHandlers } from '../imgckeditor';
import cloudinary from 'Backend/middlewares/cloudinary'
import { format } from 'date-fns'



const createImgCkeditor: any['createImgCkeditor'] = async ({
    res,
    req,
    body: { upload }
}) => {
    try {

        const date = format(new Date(), 'yyyy/MM/dd');

        const url_image = await cloudinary.v2.uploader.upload(upload,
            { folder: `producttype/imageCkeditor/${date}`, format: 'jpg' }, (error, result) => {
                if (!error) return result
                if (error) return error.message
                return 'Unknow Error'
            });

        return res.status(200).json({
            data: null,
            uploaded: true,
            url: url_image.url
        })

    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        });
    }
}

export default createImgCkeditor