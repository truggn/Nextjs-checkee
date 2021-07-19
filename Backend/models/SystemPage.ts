import mongoose, { Document, Model } from "mongoose";

const SystemPageSchema = new mongoose.Schema({
	name: {
		type: String,
        trim: true,
        unique: true,
        required: true
	},
	icon: {
		type: String,
    },
    controllerName: {
        type: String
    },
    actionName: {
        type: String
    },
    url: {
        type: String
    },
    status: {
        type: Number,
        enum: [0, 1]
    },
    orderNo: {
        type: Number
    },
    
    parentId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'SystemPage'  
    },

    level: {
        type: Number,
        enum: [0, 1, 2],
        default: 0
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

export interface ISystemPage {
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

export interface SystemPageDocument extends ISystemPage, Document {
	
}

const SystemPage : Model<SystemPageDocument> = mongoose.models.SystemPage || mongoose.model<SystemPageDocument>("SystemPage", SystemPageSchema);

export default SystemPage;