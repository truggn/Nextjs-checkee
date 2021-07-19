import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemUserTypePage, { SystemUserTypePageDocument } from '@/models/SystemUserTypePage';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createSystemUserTypePage from './handlers/createSystemUserTypePage';
import getAll from './handlers/getAll';
export type SystemUserTypePageHandlers = {
    createSystemUserTypePage : CheckeeHandler<SystemUserTypePageDocument[], CreateBody>
    getAll: CheckeeHandler<SystemUserTypePageDocument[]>
}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemUserTypePageAPI : CheckeeApiHandler< SystemUserTypePageDocument[],SystemUserTypePageHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS))return
    try{
        if(req.method==='POST'){
            const body ={...req.body}
            return await handlers['createSystemUserTypePage']({req,res,body})
        }
        if(req.method ==='GET'){
            const body= null
            return await handlers['getAll']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({data:null, errors:[{message:error}],})
        }
}
export type CreateBody={
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
export const handlers = {createSystemUserTypePage,getAll}
export default createApiHandler(SystemUserTypePageAPI, handlers,{})