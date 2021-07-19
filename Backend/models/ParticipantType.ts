import mongoose, { Document, Model } from "mongoose";
import { UserDocument } from '@/models/User';

const ParticipantTypeSchema = new mongoose.Schema<ParticipantTypeDocument>({
	name: {
		type: String,
		required: [true, "Name is required!"],
		// maxlength: [30, 'firstName cannot be more than 60 characters'],
		trim: true,
	},
		
	code: {
		type: String,
		required: [true, "Code is required!"],
        trim: true,
        unique: true
    },

    description: {
        type: String,
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

export interface IParticipantType {
	name: string;
	code: string;

    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: UserDocument['_id'];
    updatedBy: UserDocument['_id'];
    deletedBy: UserDocument['_id'];
    isDeleted: boolean;
}

export interface ParticipantTypeDocument extends IParticipantType, Document {

}

const ParticipantType : Model<ParticipantTypeDocument> = mongoose.models.ParticipantType || mongoose.model<ParticipantTypeDocument>("ParticipantType", ParticipantTypeSchema);

export default ParticipantType;