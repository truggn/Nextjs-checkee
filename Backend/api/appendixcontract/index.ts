import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, {  } from "mongoose";
import AppendixContract, { AppendixContractDocument } from '@/models/AppendixContract';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import create from './handlers/create';
import getAll from './handlers/getAll';

export type CreateBody = {
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
    nameContract: mongoose.Schema.Types.ObjectId

}
export type AppendixContractHandlers = {
    create: CheckeeHandler<AppendixContractDocument[], CreateBody>
    getAll: CheckeeHandler<AppendixContractDocument[]>
}
const METHODS = ['POST','GET','PUT','DELETE']
const AppendixContractAPI : CheckeeApiHandler<AppendixContractDocument[], AppendixContractHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        if(req.method ==='POST'){
            const body ={ ...req.body}
            return await handlers['create']({req,res,body})
        }
        if(req.method==='GET'){
            const body = null
            return await handlers['getAll']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}



export const handlers = { create,getAll}
export default createApiHandler(AppendixContractAPI, handlers,{})



