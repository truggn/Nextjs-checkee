import mongoose, { Document, Model } from "mongoose"

const ContractSchema = new mongoose.Schema({
    numberContract: {
        type: String,
        required: true
    },
    date: {
        type: Date
    },
    nameContract: {
        type: String,
        required: true
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
    isDeleted: {
        type: Boolean,
        defeault: false
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
    status: {
        type: Number,
        enum: [0, 1, 2, 3]
    },


});
export interface IContract {
    numberContract: string;
    date: Date;
    nameContract: string;
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
    status: number
}
export interface ContractDocument extends IContract, Document {

}

const Contract: Model<ContractDocument> = mongoose.models.Contract || mongoose.model<ContractDocument>("Contract", ContractSchema);

export default Contract;