import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemPage, { SystemPageDocument } from '@/models/SystemPage';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createSystemPage from './handlers/createSystemPage';
// import updateSystemPage from './handlers/updateSystemPage';
// import deletedSystemPage from './handlers/deletedSystemPage';
import getSystemPage from './handlers/getSystemPage';

export type CreateBody = {
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
export type SystemPageHandlers = {
    createSystemPage: CheckeeHandler<SystemPageDocument[], CreateBody>
    // updateSystemPage : CheckeeHandler<SystemPageDocument[],UpdateBody>
    // deletedSystemPage : CheckeeHandler<null,DeletedBody>
    getSystemPage : CheckeeHandler<SystemPageDocument[]>
}
const METHODS = ['POST', 'GET', /* 'PUT', 'DELETE' */]
const SystemPageAPI : CheckeeApiHandler<SystemPageDocument[], SystemPageHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    try{
        if(req.method ==='POST'){
            const body ={ ...req.body}
            return await handlers['createSystemPage']({req,res,body})
        }
        // if(req.method ==='PUT'){
        //     const body ={...req.body}
        //     return await handlers['updateSystemPage']({req,res,body})
        // }
        // if(req.method === 'DELETE'){
        //     const body ={...req.body}
        //     return await handlers['deletedSystemPage']({req,res,body})
        // }
        if(req.method ==='GET'){
            const body = null
            return await handlers['getSystemPage']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}



export const handlers = { createSystemPage ,getSystemPage}
export default createApiHandler(SystemPageAPI, handlers,{})



