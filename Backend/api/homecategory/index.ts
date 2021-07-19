import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from 'mongoose';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { HomeCategoryDocument } from '@/models/HomeCategory';
import createHomeCategory from './handlers/createHomeCategory';
import getDataHomeCategory from './handlers/getDataHomeCategory';
import updateHomeCategory from './handlers/updateHomeCategory';




export type bodyHomeCategory = {
    category: string,
    index: number,
    createdBy: mongoose.Schema.Types.ObjectId
}

export type bodyUpdateHomeCategory = {
    id: string,
    index: number,
    updatedBy: mongoose.Schema.Types.ObjectId
}

export type HomeCategoryHandlers = {
    createHomeCategory: CheckeeHandler<HomeCategoryDocument, bodyHomeCategory>
    getDataHomeCategory: CheckeeHandler<HomeCategoryDocument[]>
    updateHomeCategory: CheckeeHandler<HomeCategoryDocument, bodyUpdateHomeCategory>
}

const METHODS = ['GET', 'POST', 'PUT']

const homeCategoryAPI: CheckeeApiHandler<HomeCategoryDocument | HomeCategoryDocument[], HomeCategoryHandlers> = async (
    req, res, handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createHomeCategory']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = { ...req.body }
            return await handlers['getDataHomeCategory']({ req, res, body })
        }
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['updateHomeCategory']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createHomeCategory, getDataHomeCategory, updateHomeCategory }

export default createApiHandler(homeCategoryAPI, handlers, {});