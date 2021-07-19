// import { NextApiRequest, NextApiResponse } from 'next'
import uploadNewsImage from "@api/test/upload-image-ckeditor";

export const config = {
    api: {
        bodyParser: false
    }
}

// const uploadImageCKEditor = async (req: NextApiRequest, res: NextApiResponse) => {
//     try {
//         const { method } = req;

//         if (method !== 'POST') {
//             return res.status(400).json({
//                 error: 'Wrong method'
//             })
//         }

//         console.log('REQ: ', req)

//         return res.status(200).json({
//             data: ''
//         })
//     } catch (error) {
//         return res.status(500).json({
//             error: error.message
//         })
//     }    
// }

// export default uploadImageCKEditor
export default uploadNewsImage()