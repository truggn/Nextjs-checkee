import isAllowedMethod from '@/utils/is-allowed-method';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import addProductInformation, { } from './handlers/addProductInformation';



interface Product {
    id: string
}

interface bodyRequest {
    products: Product[]
}

export interface resultBody {
    numberSuccess: number;
    numberFalse: number;
}

export type ProductHandlers = {
    addProductInformation: CheckeeHandler<resultBody, bodyRequest>
}

const METHODS = ['POST']

const ProductAPI: CheckeeApiHandler<resultBody, ProductHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {

        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['addProductInformation']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { addProductInformation }

export default createApiHandler(ProductAPI, handlers, {})