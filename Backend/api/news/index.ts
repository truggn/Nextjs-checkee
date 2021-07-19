import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import { NewsDocument } from '@/models/News'
import createNews from './handlers/createNews'
import getDataNews from './handlers/getDataNews'
import updateNews from './handlers/updateNews'




export type bodyNews = {
    title: string,
    content: string,
    description: string,
    images: string[],
    createdBy: mongoose.Schema.Types.ObjectId
}
export type bodyUpdateNews = {
    id: string,
    title: string,
    content: string,
    description: string,
    images: string[],
    updatedBy: mongoose.Schema.Types.ObjectId
}
export type queryParam = {
    page: number
}

export type NewsHandlers = {
    createNews: CheckeeHandler<NewsDocument, bodyNews>
    updateNews: CheckeeHandler<NewsDocument, bodyUpdateNews>
    getDataNews: CheckeeHandler<NewsDocument[], queryParam>


}

const METHODS = ['GET', 'POST', 'PUT']

const newsAPI: CheckeeApiHandler<NewsDocument[] | NewsDocument, NewsHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {

        if (req.method === 'GET') {
            const body = { page: req.query.page, ...req.body };
            return await handlers['getDataNews']({ req, res, body })
        }
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createNews']({ req, res, body })
        }
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['updateNews']({ req, res, body })
        }

    } catch (error) {
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

const handlers = { createNews, getDataNews, updateNews }

export default createApiHandler(newsAPI, handlers, {});

