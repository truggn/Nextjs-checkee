import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import UploadFile, { UploadFileDocument } from '@/models/UploadFile';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import changeStatus from './handlers/changeStatus';



export type ChangeBody = {
    id: mongoose.Schema.Types.ObjectId;
    ProductType : mongoose.Schema.Types.ObjectId;
    createBy : mongoose.Schema.Types.ObjectId;
}
export type UploadfileHandlers = {
    changeStatus: CheckeeHandler<UploadFileDocument[],ChangeBody>
}
const METHODS = ['POST', /* 'GET', 'PUT', 'DELETE' */]
const UploadfileAPI : CheckeeApiHandler<UploadFileDocument[], UploadfileHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        if(req.method ==='POST'){
            const body ={ ...req.body}
            return await handlers['changeStatus']({req,res,body})
        }
        // if(req.method==='GET'){
        //     const body = null
        //     return await handlers['getAllFile']({req,res,body})
        // }
        
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}



export const handlers = { changeStatus }
export default createApiHandler(UploadfileAPI, handlers,{})



