import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from 'mongoose';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { CategoryProductTypeDocument } from '@/models/CategoryProductType';
import createCategoryProductType from './handlers/createCategoryProductType';
import getProductTypeByCategoryID from './handlers/getProductTypeByCategoryID';

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";


export type bodyCategoryProductType = {
    categoryID: mongoose.Schema.Types.ObjectId,
    productTypeID: mongoose.Schema.Types.ObjectId,
    createdBy: mongoose.Schema.Types.ObjectId
}

export type bodyProductByCategoryID = {
    categoryID: string,
    page: number
}



export type CategoryProductTypeHandlers = {
    createCategoryProductType: CheckeeHandler<CategoryProductTypeDocument, bodyCategoryProductType>

    getProductTypeByCategoryID: CheckeeHandler<CategoryProductTypeDocument[], bodyProductByCategoryID>
}

const METHODS = ['GET', 'POST']

const categoryProductTypeAPI: CheckeeApiHandler<
    CategoryProductTypeDocument[] | CategoryProductTypeDocument,
    CategoryProductTypeHandlers> = async (
        req, res, handlers
    ) => {

        if (!isAllowedMethod(req, res, METHODS)) return
        try {
            if (req.method === 'GET') {
                /**
                 * Kiểm tra role cho từng handler
                 */
                const athz = await authorize(req, [ROLES.NORMAL]);
                if (!athz.isAuthorized) {
                    return res.status(athz.status).json({
                        data: null,
                        errors: athz.errors,
                    });
                }
                const body = { ...req.body, page: req.query.page, categoryID: req.query.categoryID };
                return await handlers['getProductTypeByCategoryID']({ req, res, body })
            }
            if (req.method === 'POST') {
                /**
                 * Kiểm tra role cho từng handler
                 */
                const athz = await authorize(req, [ROLES.NORMAL]);
                if (!athz.isAuthorized) {
                    return res.status(athz.status).json({
                        data: null,
                        errors: athz.errors,
                    });
                }
                const body = { ...req.body }
                return await handlers['createCategoryProductType']({ req, res, body })
            }

        } catch (error) {
            res.status(500).json({ data: null, errors: [{ message: error.message }], })
        }
    }

const handlers = { createCategoryProductType, getProductTypeByCategoryID }

export default createApiHandler(categoryProductTypeAPI, handlers, {});
