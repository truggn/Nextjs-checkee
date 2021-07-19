import mongoose, { Document, Model } from "mongoose";

const SystemSettingSchema = new mongoose.Schema({
    Key : {
        type : String
    },
    Code :{
        type : String
    },
    Value :{
        type : String
    },
    Node :{
        type : String
    },
    IsLocked :{
        type: Boolean,
        default: false,
    },

    UserId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'user'  
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

export interface ISystemSetting {
    Key: string;
    Code: string;
    Value: string;
    Node: string;
    IsLocked: boolean;
    UserId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface SystemSettingDocument extends ISystemSetting, Document {
	
}

const SystemSetting : Model<SystemSettingDocument> = mongoose.models.SystemSetting || mongoose.model<SystemSettingDocument>("SystemSetting", SystemSettingSchema);

export default SystemSetting;