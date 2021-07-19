import mongoose, { Document, Model } from "mongoose"
import { ProductFlowDocument } from '@/models/ProductFlow';
import { ParticipantDocument } from '@/models/Participant';
import { ProductAttributesDocument } from '@/models/ProductAttributes';
import { UserDocument } from '@/models/User';

// require('./ProductAttributes');

const FlowSchema = new mongoose.Schema({

    productFlowId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductFlow',
    },

    participantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Participant',
    },

    productAttributes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductAttributes',
        }
    ],

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }


});

export interface IFlow {
    createBy: UserDocument['_id'];
    productFlowId: ProductFlowDocument['_id'];
    productAttributes: [ProductAttributesDocument['_id']];
    participantId: ParticipantDocument['_id'];
    isDeleted: boolean
}

export interface FlowDocument extends IFlow, Document {

}



// ProductFlowSchema.pre(/^find/, function (next) {
//     this
//         .populate({
//             path: "organizationId",
//             select: "email",
//         });
//     next();
// });

const Flow: Model<FlowDocument> = mongoose.models.Flow || mongoose.model<FlowDocument>("Flow", FlowSchema);

export default Flow;