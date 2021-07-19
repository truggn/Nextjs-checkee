import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';

import listReviewProduct from './handlers/listReviewProduct';
import Review, { ReviewsDocument } from '@/models/Review';


export type GetListReviewstHandlers = {
    listReviewProduct: CheckeeHandler<ReviewsDocument[]>

}

const METHODS = ['GET']

const ReviewByIdAPI: CheckeeApiHandler<ReviewsDocument[], GetListReviewstHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'GET') {
            const body = null;
            return await handlers['listReviewProduct']({ req, res, body })
        }
    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { listReviewProduct }
export default createApiHandler(ReviewByIdAPI, handlers, {})

