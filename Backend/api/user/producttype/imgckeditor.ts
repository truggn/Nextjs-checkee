import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createImgCkeditor from './handlers/createImgCkeditor';
import formidable from 'formidable'


import { ProductTypeDocument } from '@/models/ProductType';

export type BodySigup = {
    upload: string
}

export type ImageCkeditorHandlers = {
    createImgCkeditor: CheckeeHandler<ProductTypeDocument[], BodySigup>

}

const METHODS = ['POST']

const ImgCkeditorApi: CheckeeApiHandler<ProductTypeDocument[], ImageCkeditorHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {

        if (req.method === 'POST') {


            const form = formidable({
                keepExtensions: true,
                multiples: true,
                maxFileSize: 1 * 1024 * 1024,
            });

            const formDatas: any = await new Promise(function (resolve, reject) {
                form.parse(req, function (err: any, fields: any, files: any) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({ fields: fields, files: files });
                }); // form.parse
            });

            const body = {
                upload: formDatas.files.upload.path
            }
            return await handlers['createImgCkeditor']({ req, res, body })
        }

    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createImgCkeditor }

export default createApiHandler(ImgCkeditorApi, handlers, {});