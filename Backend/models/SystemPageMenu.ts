import mongoose, { Document, Model } from "mongoose";

const SystemPageMenuSchema = new mongoose.Schema({
    name : {
        type : String
    },
    url :{
        type : String
    },
    clas :{
        type : String
    },
    orderNo :{
        type : Number
    },
    isVisible :{
        type: Boolean,
        default: true,
    },
    pageId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'SystemPage'  
    },
    parentId: {
        type: String,
    },
    isDashBoard: {
        type: Boolean,
        default: false,
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

export interface ISystemPageMenu {
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

export interface SystemPageMenuDocument extends ISystemPageMenu, Document {
	
}

const SystemPageMenu : Model<SystemPageMenuDocument> =  mongoose.models.SystemPageMenu || mongoose.model<SystemPageMenuDocument>("SystemPageMenu", SystemPageMenuSchema);

export default SystemPageMenu;