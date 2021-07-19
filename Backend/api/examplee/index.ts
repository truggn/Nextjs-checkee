import isAllowedMethod from '@/utils/is-allowed-method';
import { TestDocument } from '@/models/Test';
import {ExampleDocument} from '@/models/Example';
import mongoose, {  } from "mongoose";
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createTest from './handlers/createTest';


export type SignupBody = {
    title: string,
    content: string
    user:mongoose.Schema.Types.ObjectId;
    createBy:mongoose.Schema.Types.ObjectId;

    name: string,
    age: string,
    
}

export type TestHandlers = {
    createTest: CheckeeHandler<TestDocument[],SignupBody>
}


const METHODS = ['GET', 'POST']

const testAPI: CheckeeApiHandler<TestDocument[], TestHandlers > = async (
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
        //     return await handlers['getEmployee']({ req, res, /* config, */  body , })
        // }

        // Create or add new employee
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['createTest']({ req, res, /* config, */ body })
        }

      
      
    } catch (error) {
        console.error(error)

        // const message =
        //     error instanceof CheckeeApiError
        //         ? 'An unexpected error ocurred with the Checkee API'
        //         : 'An unexpected error ocurred'

        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { createTest }

export default createApiHandler(testAPI, handlers, {})