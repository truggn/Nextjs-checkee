import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import uploadImage from './handlers/uploadImage';

// export type ChangeBody = {
//     id: mongoose.Schema.Types.ObjectId;
//     ProductType: mongoose.Schema.Types.ObjectId;
//     createBy: mongoose.Schema.Types.ObjectId;
// }

export type UploadImageHandlers = {
    uploadImage: CheckeeHandler<string, any>
}

const METHODS = ['POST']

const uploadNewsImage: CheckeeApiHandler<string, UploadImageHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['uploadImage']({ req, res, body })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { uploadImage }

export default createApiHandler(uploadNewsImage, handlers, {})