import isAllowedMethod from '@/utils/is-allowed-method';
import { ProductDocument } from '@/models/Product';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import updateProductInformation from './handlers/updateProductInformation';



interface Product {
    ma_sp: string
}

interface bodyRequest {
    products: Product[]
}

export interface resultBody {
    numberSuccess: number;
    numberFalse: number;
}

export type ProductHandlers = {
    updateProductInformation: CheckeeHandler<resultBody, bodyRequest>,
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
            return await handlers['updateProductInformation']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { updateProductInformation }

export default createApiHandler(ProductAPI, handlers, {})