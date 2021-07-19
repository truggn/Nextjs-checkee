import mongoose, { Document, Model } from "mongoose";

const UserTypeSchema = new mongoose.Schema({
	name: {
		type: String,
        trim: true,
        unique: true,
        required: true
	},

    orderNo: {
        type: Number
    },

    note: {
        type: String
    },
    
    objectId: {
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

export interface IUserType {
	name: string;
    note: string;
    orderNo: string;
    objectId: mongoose.Schema.Types.ObjectId;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface UserTypeDocument extends IUserType, Document {
	
}

const UserType : Model<UserTypeDocument> = mongoose.models.UserType || mongoose.model<UserTypeDocument>("UserType", UserTypeSchema);

export default UserType;