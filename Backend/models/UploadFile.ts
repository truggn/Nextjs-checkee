import mongoose, { Document, Model } from "mongoose";
import { UserDocument } from '@/models/User';
const UploadFileSchema = new mongoose.Schema({
	
    fileName: {
        type: String
    },

    path: {
       type: String 
    },
    date: {
        type : Date
    },
    status: {
        type: Number,
        enum: [1,2,],
        default: 1
    },
    
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        // required : true,
        ref: 'Organization',
    },

    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    
    deletedAt: {
        type: Date
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true});

export interface IUploadFile {
	fileName: string;
    path: string;
    status: number;
    date: Date;
    createdAt: string;
    updatedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface UploadFileDocument extends IUploadFile, Document {
	
}

const UploadFile : Model<UploadFileDocument> = mongoose.models.UploadFile || mongoose.model<UploadFileDocument>("UploadFile", UploadFileSchema);

export default UploadFile;