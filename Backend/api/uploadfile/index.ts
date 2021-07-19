import isAllowedMethod from '@/utils/is-allowed-method';
import mongoose from "mongoose";
import { UploadFileDocument } from '@/models/UploadFile';
import  createApiHandler, {
    CheckeeApiHandler,
    CheckeeHandler,
} from '@/utils/create-api-handler';
import createFile from './handlers/createFile';
import getAllFile from './handlers/getAllFile'
const formidable = require('formidable');

export type CreateBody = {
    fileName: String;
    path: String;
    date : Date;
    status : Number;
    createdBy: mongoose.Schema.Types.ObjectId;
}
export type UploadfileHandlers = {
    createFile: CheckeeHandler<UploadFileDocument[],CreateBody>
    getAllFile : CheckeeHandler<UploadFileDocument[]>
}
const METHODS = ['POST', 'GET', /* 'PUT', 'DELETE' */]

const UploadfileAPI : CheckeeApiHandler<UploadFileDocument[], UploadfileHandlers> = async(
    req,
    res,
    handlers
)=>{
    if(!isAllowedMethod(req,res,METHODS)) return 
    
    try{
        if(req.method ==='POST'){
            //
            const form = formidable({
                uploadDir: "./files/",
                keepExtensions: true,
                multiples: true,
                maxFileSize: 3 * 1024 * 1024,
            });

            form.uploadDir = "./files/"
            // form.maxFileSize = 1 * 1024 * 1024

            const formDatas: any = await new Promise(function (resolve, reject) {
                form.parse(req, function (err: any, fields: any, files: any) {
                    if (err) {
                        reject(err);
                        return;
                    }

                    resolve({ fields: fields, files: files });
                }); // form.parse
            });
            
            const body = {
                fileName: formDatas.files.file.name,
                path: formDatas.files.file.path,
                date: formDatas.fields.date,
                status: formDatas.fields.status,
                createdBy: formDatas.fields.createdBy,
            }
            return await handlers['createFile']({req,res,body})
        }
        if(req.method==='GET'){
            const body = null
            return await handlers['getAllFile']({req,res,body})
        }
        
    }catch(error){
        console.error(error)
        res.status(500).json({ data :null, errors:[{message: error.message}],})
    }
}

export const handlers = { createFile,getAllFile }
export default createApiHandler(UploadfileAPI, handlers,{})