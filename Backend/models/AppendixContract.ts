import mongoose, { Document, Model } from "mongoose"

const AppendixContractSchema = new mongoose.Schema({
    numberAppendixContract: {
        type: Number,
        required: true
    },
    date: {
        type: Date
    },
    durationPay: {
        type: Date,
        require: true
    },
    packageBuy: {
        type: String,
        required: true
    },
    contractValue: {
        type: Number,
        required: true
    },
    vat: {
        type: Number,
    },
    vatPrice: {
        type: Number
    },
    fileDoc: {
        type: String
    },
    publicKey: {
        type: String,
        require: true
    },
    privateKey: {
        type: String,
        required: true
    },
    startDay: {
        type: Date,
        required: true
    },
    endDay: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    },
    nameContract: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Contract'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

});
export interface IAppendixContract {
    numberAppendixContract: number;
    date: Date;
    nameContract: mongoose.Schema.Types.ObjectId;
    durationPay: string;
    packageBuy: string;
    contractValue: number;
    vat: number;
    vatPrice: number;
    fileDoc: string;
    publicKey: string;
    privateKey: string;
    startDay: Date;
    endDay: Date;
    isDeleted: boolean;
    customerId: mongoose.Schema.Types.ObjectId;
    createBy: mongoose.Schema.Types.ObjectId;
}
export interface AppendixContractDocument extends IAppendixContract, Document {

}

const AppendixContract: Model<AppendixContractDocument> = mongoose.models.AppendixContract || mongoose.model<AppendixContractDocument>("AppendixContract", AppendixContractSchema);

export default AppendixContract;