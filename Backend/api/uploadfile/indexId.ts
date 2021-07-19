import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import { UploadFileDocument } from '@/models/UploadFile';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import getById from './handlers/getById'

export type UploadfileHandlers = {
   
    getById : CheckeeHandler<UploadFileDocument>
}
const METHODS = ['POST', 'GET', /* 'PUT', 'DELETE' */]

const UploadfileAPI : CheckeeApiHandler<UploadFileDocument, UploadfileHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    
    try{
        if(req.method ==='GET'){
            const body = null
            return await handlers['getById']({req,res,body})
        }
        
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}

export const handlers = { getById }
export default createApiHandler(UploadfileAPI, handlers,{})