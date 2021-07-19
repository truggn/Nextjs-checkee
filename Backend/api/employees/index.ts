import isAllowedMethod from '@/utils/is-allowed-method';
import { EmployeeDocument } from '@/models/Employee';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getEmployee from './handlers/get-employees';
import addEmployee from './handlers/add-employees';

export type SignupBody = {
    firstName: string
    lastName: string
    email: string
    password: string
}

export type EmployeesHandlers = {
    getEmployee: CheckeeHandler<EmployeeDocument[]>
    addEmployee: CheckeeHandler<EmployeeDocument[], SignupBody>
}


const METHODS = ['GET', 'POST']

const employeesAPI: CheckeeApiHandler<EmployeeDocument[], EmployeesHandlers> = async (
    req,
    res,
    // config,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        // Return all employees info
        if (req.method === 'GET') {
            const body = null
            return await handlers['getEmployee']({ req, res, /* config, */  body , })
        }

        // Create or add new employee
        if (req.method === 'POST') {
            const body = { ...req.body }
            return await handlers['addEmployee']({ req, res, /* config, */ body })
        }

        // // Update employees
        // if (req.method === 'PUT') {
        //     const body = { ...req.body, employeeId }
        //     return await handlers['updateEmployee']({ req, res, config, body })
        // }

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

export const handlers = { getEmployee, addEmployee }

export default createApiHandler(employeesAPI, handlers, {})