import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import aceessRight from './handlers/aceessRight';
export type SystemUserTypePageHandlers = {
    aceessRight : CheckeeHandler<SystemUserTypePageDocument, aceessRight>
}
const METHODS = ['POST']
const SystemUserTypePageAPI : CheckeeApiHandler< SystemUserTypePageDocument,SystemUserTypePageHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS))return
    try{
        if(req.method==='POST'){
            const body ={...req.body}
            return await handlers['aceessRight']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({data:null, errors:[{message:error}],})
        }
}
export type aceessRight={
    userId: mongoose.Schema.Types.ObjectId;
    controllerName: string;
    actionName: string;
    
}
export const handlers = {aceessRight}
export default createApiHandler(SystemUserTypePageAPI, handlers,{})