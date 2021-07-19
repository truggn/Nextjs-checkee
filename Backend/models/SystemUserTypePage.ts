import mongoose, { Document, Model } from "mongoose";
import { SystemPageDocument } from '@/models/SystemPage'

const SystemUserTypePageSchema = new mongoose.Schema({
    userTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'UserType'  
    },

    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'SystemPage'  
    },

    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'SystemPage'  
    },
    
    createdAt: {
        type: Date,
        required: true,
        default: Date.now    
    },

    updatedAt: {
        type: Date,
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

export interface ISystemUserTypePage {
	userTypeId: mongoose.Schema.Types.ObjectId;
    parentId: SystemPageDocument['_id'];
    pageId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface SystemUserTypePageDocument extends ISystemUserTypePage, Document {
	
}

const SystemUserTypePage: Model<SystemUserTypePageDocument> = mongoose.models.SystemUserTypePage || mongoose.model<SystemUserTypePageDocument>("SystemUserTypePage", SystemUserTypePageSchema);

export default SystemUserTypePage;