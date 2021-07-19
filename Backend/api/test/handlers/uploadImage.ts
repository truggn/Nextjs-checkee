import dbConnect from '@/utils/dbConnect'
import type { UploadImageHandlers } from '../upload-image-ckeditor'
// const formidable = require('formidable')
import cloudinary from '@middlewares/cloudinary'
import { NextApiRequest, NextApiResponse } from 'next'
import multer from 'multer';

// const upload = multer()

// MemoryStorage
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const uploadCloudinary = () => {
    // console.log('image: ', image)

    const url_img = cloudinary.v2.uploader.upload_stream(
        {
            folder: 'test',
        },
        (error, result) => {
            console.log('uploadCloudinary error: ', error)
            console.log('uploadCloudinary result: ', result)
            if (result) return result
            if (error) return error.message
            return 'Unknow Error'
        }
    )

    return url_img
}

export function initMiddleware(middleware: any) {
    return (req: NextApiRequest, res: NextApiResponse) =>
      new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
            if (result instanceof Error) {
                return reject(result);
            }
            return resolve(result);
        });
    });
}

const multerAny = initMiddleware(
    upload.any()
)

const uploadStream = async (fileBuffer: Buffer) => {
    return new Promise((resolve, reject) => {
        return cloudinary.v2.uploader.upload_stream({
            folder: 'test',
        }, (error, result) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(result);
            }
        })
        .end(fileBuffer);
    });
}

const uploadImage: UploadImageHandlers['uploadImage'] = async ({
    req,
    res,
    body
}) => {
    try {
        console.log('REQ: ', req)

        // const url_img = cloudinary.v2.uploader.upload(req.files[0], {
        //     folder: 'test',
        //     transformation: [{
        //         quality: 'auto',
        //         fetch_format: 'auto'
        //     }],
        //     // format: 'png'
        // }, (error, result) => {
        //     console.log('uploadCloudinary error: ', error)
        //     console.log('uploadCloudinary result: ', result)
        //     if (result) return result
        //     if (error) return error.message
        //     return 'Unknow Error'
        // })
        
        // //=== Formidable ===
        // // const form = formidable({
        // //     keepExtensions: true,
        // // })

        let uploaded = false
        let url = ''

        // //=== Formidable ===
        // const form =  formidable({
        //     // fileWriteStreamHandler: uploadCloudinary,
        //     fileWriteStreamHandler: () => {
        //         // console.log('image: ', image)
            
        //         const url_img = cloudinary.v2.uploader.upload_stream(
        //             {
        //                 folder: 'test',
        //             },
        //             (error, result) => {
        //                 console.log('uploadCloudinary error: ', error)
        //                 console.log('uploadCloudinary result: ', result)
        //                 if (result) urlImage = result.url
        //                 if (error) return error.message
        //                 return 'Unknow Error'
        //             }
        //         )
            
        //         return url_img
        //     },
        // });

        // const formfields = await new Promise(function(resolve, reject) {
        //     form.parse(req, function(err, fields, files) {
        //         if (err) {
        //             console.log('form err: ', err);
        //             reject(err);
        //             return;
        //         }

        //         console.log('form fields: ', fields);
        //         console.log('form files: ', files);
        //         resolve(files);
        //     }); // form.parse
        // });

        // // form.parse(req, (err, fields, files) => {
        // //     console.log('form err: ', err);
        // //     console.log('form fields: ', fields);
        // //     console.log('form files: ', files);
        // // });

        // console.log('form: ', form)
        // //=== Formidable ===

        //=== Multer ===
        await multerAny(req, res);

        console.log('Multer: ', req)
        console.log('Multer: ', req.files[0].buffer)

        const uploadedCloudinary : any = await uploadStream(req.files[0].buffer)

        console.log('uploaded', uploaded)

        if(uploadedCloudinary.url) {
            uploaded = true
            url = uploadedCloudinary.url
        }

        // const url_img = await cloudinary.v2.uploader.upload(req.files[0].buffer, {
        //     folder: 'test',
        //     transformation: [{
        //         quality: 'auto',
        //         fetch_format: 'auto'
        //     }],
        //     // format: 'png'
        // }, (error, result) => {
        //     console.log('uploadCloudinary error: ', error)
        //     console.log('uploadCloudinary result: ', result)
        //     if (result) return result
        //     if (error) return error.message
        //     return 'Unknow Error'
        // })
        //=== Multer ===

        return res.status(200).json({
            data: null,
            uploaded,
            url,
        })
    } catch (error) {
        return res.status(500).json({
            data: null,
            errors: [{ message: error.message }],
        })
    }
}

export default uploadImage