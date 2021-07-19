import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import updateSystemPageMenu from './handlers/updateSystemPageMenu';
import deleteSystemPageMenu from './handlers/deleteSystemPageMenu';
import getSystemPageMenuById from './handlers/getSystemPageMenuById';
export type SystemPageMenuHandlers = {
    updateSystemPageMenu : CheckeeHandler<SystemPageMenuDocument, updateBody>
    deleteSystemPageMenu : CheckeeHandler<SystemPageMenuDocument>
    getSystemPageMenuById : CheckeeHandler<SystemPageMenuDocument>
}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemPageMenuAPI : CheckeeApiHandler< SystemPageMenuDocument,SystemPageMenuHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS))return
    try{
        if(req.method==='PUT'){
            const body ={...req.body}
            return await handlers['updateSystemPageMenu']({req,res,body})
        }
        if(req.method ==='DELETE'){
            const body= null
            return await handlers['deleteSystemPageMenu']({req,res,body})
        }
        if(req.method==='GET'){
            const body = null
            return await handlers['getSystemPageMenuById']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({data:null, errors:[{message:error}],})
        }
}
export type updateBody ={
    name: string;
    url: string;
    clas: string;
    orderNo: string;
    isVisible: boolean;
    pageId: mongoose.Schema.Types.ObjectId;
    parentId: string;
    isDashBoard: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
export const handlers = {updateSystemPageMenu,deleteSystemPageMenu,getSystemPageMenuById}
export default createApiHandler(SystemPageMenuAPI, handlers,{})
