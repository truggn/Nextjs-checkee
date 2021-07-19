import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose, { Document, Query } from "mongoose";
import SystemPageMenu, { SystemPageMenuDocument } from '@/models/SystemPageMenu';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createSystemPageMenu from './handlers/createSystemPageMenu';
import getSystemPageMenu from './handlers/getSystemPageMenu';
export type SystemPageMenuHandlers = {
    createSystemPageMenu : CheckeeHandler<SystemPageMenuDocument[], CreateBody>
    getSystemPageMenu : CheckeeHandler<SystemPageMenuDocument[]>

}
const METHODS = ['POST','GET','PUT','DELETE']
const SystemPageMenuAPI : CheckeeApiHandler< SystemPageMenuDocument[],SystemPageMenuHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS))return
    try{
        if(req.method==='POST'){
            const body ={...req.body}
            return await handlers['createSystemPageMenu']({req,res,body})
        }
        if(req.method ==='GET'){
            const body= null
            return await handlers['getSystemPageMenu']({req,res,body})
        }
    }catch(error){
        console.error(error)
        res.status(500).json({data:null, errors:[{message:error}],})
        }
}
export type CreateBody ={
    name: String;
    url: String;
    clas: String;
    orderNo: String;
    isVisible: Boolean;
    pageId: mongoose.Schema.Types.ObjectId;
    parentId: String;
    isDashBoard: Boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}
export const handlers = {createSystemPageMenu,getSystemPageMenu}
export default createApiHandler(SystemPageMenuAPI, handlers,{})
