import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import UserType, { UserTypeDocument } from '@/models/UserType';

import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import updateUserType from './handlers/updateUserType';
import deleteUserType from './handlers/deleteUserType';
import getUserTypeById from './handlers/getUserTypeById';






export type UserTypeHandlers = {
    updateUserType: CheckeeHandler<UserTypeDocument, UpdateBody>
    deleteUserType: CheckeeHandler<UserTypeDocument>
    getUserTypeById: CheckeeHandler<UserTypeDocument>
}
const METHODS = ['POST', 'GET', 'PUT', 'DELETE']
const UserTypeAPI: CheckeeApiHandler<UserTypeDocument, UserTypeHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['updateUserType']({ req, res, body })
        }
        if (req.method === 'DELETE') {
            const body = null;
            return await handlers['deleteUserType']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = null;
            return await handlers['getUserTypeById']({ req, res, body })
        }
    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}
export type UpdateBody = {
    id: mongoose.Schema.Types.ObjectId,
    name: string;
    note: string;
    orderNo: string;
    objectId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
export const handlers = { updateUserType, deleteUserType, getUserTypeById }
export default createApiHandler(UserTypeAPI, handlers, {})