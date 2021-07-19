import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';

import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getSystemPageByLevel from './handlers/getSystemPageByLevel';

export type SystemPageByLevelHandlers = {
    getSystemPageByLevel : CheckeeHandler<SystemPageDocument[]>
}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemPageAPI : CheckeeApiHandler<SystemPageDocument[], SystemPageByLevelHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        if(req.method ==='GET'){
            const body = null
            return await handlers['getSystemPageByLevel']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}



export const handlers = { getSystemPageByLevel}
export default createApiHandler(SystemPageAPI, handlers,{})