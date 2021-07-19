import mongoose, { Document, Model } from "mongoose"
import { UserDocument } from '@/models/User';

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String
    },

    code: {
        type: String
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
    isDeleted: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    // createdAt: { 
    //     type: Date,
    //     default: Date.now
    // },

    /////
    taxCode: {
        type: String,
    },

    bank: {
        type: String,
    },

    fax: {
        type: String,
    },

    certificate_image: {
        type: Array,
    },

    account_number: {
        type: String,
    },


    name_customer: {
        type: String,
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

}, { timestamps: true, optimisticConcurrency: true, });

export interface IOrganization {
    createBy: UserDocument['_id'],
    code: string,
    name: string,
    icon: string
    color: string,
    fontsize: number,
    address: string,
    phone: string,
    email: string,
    taxCode: string;
    bank: string;
    fax: string;
    isDeleted: boolean;
    certificate_image: string[];
    account_number: string;
    name_customer: string;
}
export interface OrganizationDocument extends IOrganization, Document {

}

// // Khách hàng
// export interface CustomerDocument extends IOrganization, Document{
//     taxCode: number;
//     bank: string;
//     fax: number;
//     certificate_image: string[];
//     account_number: number;
//     name_customer : string;
// }

const Organization: Model<OrganizationDocument> = mongoose.models.Organization || mongoose.model<OrganizationDocument>("Organization", OrganizationSchema);

export default Organization;