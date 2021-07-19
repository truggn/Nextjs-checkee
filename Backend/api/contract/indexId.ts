import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { } from "mongoose";
import Contract, { ContractDocument } from '@/models/Contract';
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import updateContract from './handlers/updateContract';
import deleteContract from './handlers/deleteContract';
import getContractById from './handlers/getContractById';




export type updateBody = {
    numberContract: string;
    date: Date;
    nameContract: string;
    durationPay: string;
    packageBuy: string;
    contractValue: number;
    vat: number;
    vatPrice: number;
    fileDoc: string;
    publicKey: string;
    privateKey: string;
    startDay: Date;
    endDay: Date;
    status: Number
}
export type ContractHandlers = {
    updateContract: CheckeeHandler<ContractDocument, updateBody>
    deleteContract: CheckeeHandler<ContractDocument>
    getContractById: CheckeeHandler<ContractDocument>
}
const METHODS = ['POST', 'GET', 'PUT', 'DELETE']
const ContractAPI: CheckeeApiHandler<ContractDocument, ContractHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'PUT') {
            const body = { ...req.body }
            return await handlers['updateContract']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = null
            return await handlers['getContractById']({ req, res, body })
        }
        if (req.method === 'DELETE') {
            const body = null
            return await handlers['deleteContract']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}



export const handlers = { updateContract, deleteContract, getContractById }
export default createApiHandler(ContractAPI, handlers, {})



