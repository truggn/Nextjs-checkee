import mongoose, { Document, Model } from "mongoose"
import { ProductTypeDocument } from '@/models/ProductType';
import { OrganizationDocument } from '@/models/Organization';
import { UserDocument } from '@/models/User';
import { FlowDocument } from '@/models/Flow';

// require('./Flow');

const ProductFlowSchema = new mongoose.Schema({

    name: {
        type: String,
    },

    code: {
        type: String,
        required: '{PATH} is required!',
    },

    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },


    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },

    flow: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Flow',
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
    },


    // }, {
    //     toJSON: { 
    //         virtuals: true 
    //     },
    //     toObject: { 
    //         virtuals: true 
    //     },


});

export interface IProductFlow {
    name: string,
    code: string,
    isDeleted: boolean,
    createBy: UserDocument['_id'];
    productTypeId: ProductTypeDocument['_id'];
    organizationId: OrganizationDocument['_id'];
    flow: [FlowDocument['_id']];
}

export interface ProductFlowDocument extends IProductFlow, Document {

}

// // Virtual populate
// ProductFlowSchema.virtual("Flow", {
//     ref: "Flow",
//     foreignField: "productFlowId",
//     localField: "_id",
//     justOne: false,
//     options: { 
//         // match: { 
//         //     isDeleted: false 
//         // },
//         // sort: { 
//         //     createdAt: -1 
//         // }, 
//         // limit: 5 
//     }
// });

// ProductFlowSchema.pre(/^find/, function (next) {
//     this
//         .populate({
//             path: "organizationId",
//             select: "email",
//         });
//     next();
// });

const ProductFlow: Model<ProductFlowDocument> = mongoose.models.ProductFlow || mongoose.model<ProductFlowDocument>("ProductFlow", ProductFlowSchema);

export default ProductFlow;