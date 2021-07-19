import isAllowedMethod from '@/utils/is-allowed-method';
import { OrganizationDocument } from '@/models/Organization';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import addCustomer from './handlers/addCustomer';
import getAllCustomer from './handlers/getAllCustomer';
import Ajv, { JSONSchemaType, DefinedError } from "ajv";


interface SignupBody {
    code: string,
    icon: string,
    address: string,
    phone: string,
    email: string,
    taxCode: string,
    bank: string,
    fax: string,
    certificate_image: string[],
    account_number: string,
    name_customer: string
}

export type CustomerHandlers = {
    addCustomer: CheckeeHandler<OrganizationDocument[], SignupBody>
    getAllCustomer: CheckeeHandler<OrganizationDocument[]>
}

const METHODS = ['POST', 'GET']

// TODO: should have schema validation for `req.body`
const ajv = new Ajv()

// type MyData = { foo: number }
// const schema: JSONSchemaType<MyData> = {
//     type: "object",
//     properties: {
//         foo: { type: "number", minimum: 0 },
//     },
//     required: ["foo"],
//     additionalProperties: false,
// }

const customersAPI: CheckeeApiHandler<OrganizationDocument[], CustomerHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return

    try {
        if (req.method === 'POST') {
            // TODO: Add proper validations with something like Ajv
            const body = { ...req.body }
            return await handlers['addCustomer']({ req, res, /* config, */ body })
        }
        if (req.method === 'GET') {
            const body = null
            return await handlers['getAllCustomer']({ req, res, /* config, */ body })
        }
    } catch (error) {
        console.error(error)



        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}

export const handlers = { addCustomer, getAllCustomer }

export default createApiHandler(customersAPI, handlers, {})