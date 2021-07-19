import mongoose, { Document, Model } from "mongoose"
import { UserDocument } from '@/models/User';
import { OrganizationDocument } from '@/models/Organization';
import { ParticipantTypeDocument } from '@/models/ParticipantType';

const ParticipantSchema = new mongoose.Schema({
    code: {
        type: String,
    },

    icon: {
        type: String
    },

    color: {
        type: String
    },

    fontsize: {
        type: Number
    },

    participantType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParticipantType',

        // type: String,
        // enum: ['Staff', 'Owner'],
        // // default: 'Staff'
    },

    participantName: {
        type: String,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    address: {
        type: String,
        // required: [true, "Address is required!"],
        trim: true,
    },
    phone: {
        type: String,
        // required: [true, "Phone is required!"],
        trim: true,
    },

    email: {
        type: String,
        required: [true, "Email is required!"],
        trim: true,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    }

}, { timestamps: true });

export interface IParticipant {
    createBy: UserDocument['_id'],
    organizationId: OrganizationDocument['_id']
    address: string,
    phone: string,
    email: string,
    code: string,
    isDeleted: boolean,
    participantType: ParticipantTypeDocument['_id'],
    participantName: string,

}

// Khách hàng
export interface ParticipantDocument extends IParticipant, Document {
}

const Participant: Model<ParticipantDocument> = mongoose.models.Participant || mongoose.model<ParticipantDocument>("Participant", ParticipantSchema);

export default Participant;