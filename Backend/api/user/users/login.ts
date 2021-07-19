import isAllowedMethod from '@/utils/is-allowed-method';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import login from './handlers/login';


export type LoginBody = {
    email: string
    password: string
}

export interface LoginToken {
    'user-token': string,
}

export type UsersHandlers = {
    login: CheckeeHandler<LoginToken, Partial<LoginBody>>
}


const METHODS = ['POST']

const loginApi: CheckeeApiHandler<LoginToken, UsersHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        const body = req.body ?? {}
        return await handlers['login']({ req, res, /* config, */ body })
        
    } catch (error) {
        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { login }

export default createApiHandler(loginApi, handlers, {})