import isAllowedMethod from '@/utils/is-allowed-method';
import { UserDocument } from '@/models/User';
import mongoose from "mongoose";

import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import addUser from './handlers/addUser';
import getAllUser from './handlers/getAllUser'
import updateUser from './handlers/update'


export type SignupBody = {
    firstName: string
    lastName: string
    email: string
    password: string
    birthday: Date
    sex: number
    status: number
    userTypeId: mongoose.Schema.Types.ObjectId,
}

export type UpdateBody = {
    firstName: string
    lastName: string
    birthday: Date
    sex: number
    status: number
    address: string
    phone: string
    image_url: string
    isChildOf: mongoose.Schema.Types.ObjectId
    LAT: string
    LNG: string
    playerID: string
}

export type UsersHandlers = {
    addUser: CheckeeHandler<UserDocument[], SignupBody>
    getAllUser: CheckeeHandler<UserDocument[]>
    updateUser: CheckeeHandler<UserDocument[], UpdateBody>
}


const METHODS = ['POST', 'GET', 'PUT']

const usersAPI: CheckeeApiHandler<UserDocument[], UsersHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        // Return all employees info
        // if (req.method === 'GET') {
        //     const body = null
        //     return await handlers['getEmployee']({ req, res, /* config, */  body  })
        // }

        // Create or add new User
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['addUser']({ req, res, /* config, */ body })
        }
        if (req.method === 'GET') {
            const body = null
            return await handlers['getAllUser']({ req, res, body })
        }

        // Update User
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['updateUser']({ req, res, body })
        }

        // // Remove employees
        // if (req.method === 'DELETE') {
        //     const body = { ...req.body, employeeId }
        //     return await handlers['removeEmployee']({ req, res, config, body })
        // }
    } catch (error) {
        console.error(error)

        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { addUser, getAllUser, updateUser,/* , addEmployee */ }

export default createApiHandler(usersAPI, handlers, {})