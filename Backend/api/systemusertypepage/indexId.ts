import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import update from './handlers/update';
import deleted from './handlers/deleted';
import getById from './handlers/getById';
export type SystemUserTypePageHandlers = {
    update : CheckeeHandler<SystemUserTypePageDocument, updateBody>
    deleted: CheckeeHandler<SystemUserTypePageDocument>
    getById :CheckeeHandler<SystemUserTypePageDocument>
}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemUserTypePageAPI : CheckeeApiHandler< SystemUserTypePageDocument,SystemUserTypePageHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS))return
    try{
        if(req.method==='PUT'){
            const body ={...req.body}
            return await handlers['update']({req,res,body})
        }
        if(req.method ==='GET'){
            const body= null
            return await handlers['getById']({req,res,body})
        }
        if(req.method==='DELETE'){
            const body = null
            return await handlers['deleted']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({data:null, errors:[{message:error}],})
        }
}
export type updateBody={
    id:mongoose.Schema.Types.ObjectId;
    userTypeId: mongoose.Schema.Types.ObjectId;
    parentId: mongoose.Schema.Types.ObjectId;
    pageId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
export const handlers = {update,deleted,getById}
export default createApiHandler(SystemUserTypePageAPI, handlers,{})