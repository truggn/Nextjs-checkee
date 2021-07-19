import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, {  } from "mongoose";
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import update from './handlers/update';
import getById from './handlers/getById';
import deleted from './handlers/deleted';

export type updateBody = {
    numberAppendixContract : number;
    date : Date;
    durationPay : string;
    packageBuy : string;
    contractValue : number;
    vat : number;
    vatPrice : number;
    fileDoc : string;
    publicKey: string;
    privateKey: string;
    startDay: Date;
    endDay: Date;
    createBy:mongoose.Schema.Types.ObjectId;
    nameContract:mongoose.Schema.Types.ObjectId
}
export type AppendixContractHandlers = {
    update: CheckeeHandler<AppendixContractDocument, updateBody>
    getById: CheckeeHandler<AppendixContractDocument>
    deleted: CheckeeHandler<AppendixContractDocument>
}
const METHODS = ['POST','GET','PUT','DELETE']
const AppendixContractAPI : CheckeeApiHandler<AppendixContractDocument, AppendixContractHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        if(req.method ==='PUT'){
            const body ={ ...req.body}
            return await handlers['update']({req,res,body})
        }
        if(req.method ==='GET'){
            const body = null
            return await handlers['getById']({req,res,body})
        }
        if(req.method ==='DELETE'){
            const body = null
            return await handlers['deleted']({req,res,body})
        }
        
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}



export const handlers = { update, getById, deleted}
export default createApiHandler(AppendixContractAPI, handlers,{})



