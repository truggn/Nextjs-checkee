import isAllowedMethod from '@/utils/is-allowed-method';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import recovery from './handlers/recovery'

export type AccountRecoveryBody = {
    email: string
    nickName: string,
    phone: string,
}

export type AccountRecoveryHandlers = {
    recovery: CheckeeHandler<string, Partial<AccountRecoveryBody>>
}

const METHODS = ['POST']

const accountRecoveryApi : CheckeeApiHandler<string, AccountRecoveryHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        const body = {...req.body}
        return await handlers['recovery']({ req, res, /* config, */  body })
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { recovery }

export default createApiHandler(accountRecoveryApi, handlers, {});