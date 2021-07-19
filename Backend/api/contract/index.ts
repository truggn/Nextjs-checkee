import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { } from "mongoose";
import Contract, { ContractDocument } from '@/models/Contract';
const formidable = require('formidable');
import createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createContract from './handlers/createContract';
import getAllContract from './handlers/getAllContract';




export type CreateBody = {
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
    createBy: mongoose.Schema.Types.ObjectId;
    status: Number
}
export type ContractHandlers = {
    createContract: CheckeeHandler<ContractDocument[], CreateBody>
    getAllContract: CheckeeHandler<ContractDocument[]>
}
const METHODS = ['POST', 'GET', 'PUT', 'DELETE']
const ContractAPI: CheckeeApiHandler<ContractDocument[], ContractHandlers> = async (
    req,
    res,
    handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return
    try {
        if (req.method === 'POST') {
            const form = formidable({
                uploadDir: "./files/",
                keepExtensions: true,
                multiples: true,
                maxFileSize: 3 * 1024 * 1024,
            });

            form.uploadDir = "./files/"

            const formDatas: any = await new Promise(function (resolve, reject) {
                form.parse(req, function (err: any, fields: any, files: any) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({ fields: fields, files: files });
                }); // form.parse
            });
            const body = {
                fileDoc: formDatas.files.file.path, createBy: formDatas.fields.createBy,
                numberContract: formDatas.fields.numberContract, date: formDatas.fields.date, durationPay: formDatas.fields.durationPay,
                packageBuy: formDatas.fields.packageBuy, contractValue: formDatas.fields.contractValue, vat: formDatas.fields.vat,
                vatPrice: formDatas.fields.vatPrice, publicKey: formDatas.fields.publicKey, privateKey: formDatas.fields.privateKey, startDay: formDatas.fields.startDay, endDay: formDatas.fields.endDay,
                status: formDatas.fields.status, nameContract: formDatas.fields.nameContract
            }
            // const body ={ ...req.body}
            return await handlers['createContract']({ req, res, body })
        }
        if (req.method === 'GET') {
            const body = null
            return await handlers['getAllContract']({ req, res, body })
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({ data: null, errors: [{ message: error.message }], })
    }
}



export const handlers = { createContract, getAllContract }
export default createApiHandler(ContractAPI, handlers, {})



