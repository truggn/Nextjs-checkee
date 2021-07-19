import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';

import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import updateSystemPage from './handlers/updateSystemPage';
import deletedSystemPage from './handlers/deletedSystemPage';
import getSystemPageById from './handlers/getSystemPageById';
export type SystemPageIdHandlers = {
    // createSystemPage: CheckeeHandler<SystemPageDocument[], CreateBody>
    updateSystemPage : CheckeeHandler<SystemPageDocument,UpdateBody>
    deletedSystemPage : CheckeeHandler<SystemPageDocument>
    getSystemPageById : CheckeeHandler<SystemPageDocument>
    // getSystemPage : CheckeeHandler<SystemPageDocument[]>
}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemPageAPI : CheckeeApiHandler<SystemPageDocument, SystemPageIdHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        // if(req.method ==='POST'){
        //     const body ={ ...req.body}
        //     return await handlers['createSystemPage']({req,res,body})
        // }
        if(req.method ==='PUT'){
            const body ={...req.body}
            return await handlers['updateSystemPage']({req,res,body})
        }
        if(req.method === 'DELETE'){
            const body = null
            return await handlers['deletedSystemPage']({req,res,body})
        }
        if(req.method ==='GET'){
            const body = null
            return await handlers['getSystemPageById']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}
export type UpdateBody ={
    id : mongoose.Schema.Types.ObjectId,
    name: string;
    icon: string;
    status: number;
    controllerName: string;
    actionName: string;
    url: string;
    orderNo: string;
    parentId: mongoose.Schema.Types.ObjectId;
    level: number;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}


export const handlers = { updateSystemPage ,deletedSystemPage,getSystemPageById}
export default createApiHandler(SystemPageAPI, handlers,{})