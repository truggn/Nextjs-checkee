import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import UserType, { UserTypeDocument } from '@/models/UserType';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createUserType from './handlers/createUserType';
import getUserType from './handlers/getUserType';





export type UserTypeHandlers = {
    createUserType: CheckeeHandler<UserTypeDocument[], CreateBody>
    getUserType: CheckeeHandler<UserTypeDocument[]>
}
const METHODS = ['POST', 'GET', 'PUT', 'DELETE']
const UserTypeAPI: CheckeeApiHandler<UserTypeDocument[], UserTypeHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createUserType']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = null
            return await handlers['getUserType']({ req, res, body })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error }], })
    }
}
export type CreateBody = {
    name: String;
    note: String;
    orderNo: String;
    objectId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
export const handlers = { createUserType, getUserType }
export default createApiHandler(UserTypeAPI, handlers, {})