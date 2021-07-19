import isAllowedMethod from '@/utils/is-allowed-method';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import notification from './handlers/notification'



export type NotificationHandlers = {
    notification: CheckeeHandler<string>
}

const METHODS = ['GET']

const notificationApi : CheckeeApiHandler<string> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        // if (req.method === 'POST') {
        // const body = {...req.body}
        // return await handlers['recovery']({ req, res, /* config, */  body })
        // }

        if (req.method === 'GET') {
            const body = null;
            return await handlers['notification']({ req, res, body })
        }
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { notification }

export default createApiHandler(notificationApi, handlers, {});