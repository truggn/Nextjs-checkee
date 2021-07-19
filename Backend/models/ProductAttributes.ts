import mongoose, { Document, Model } from "mongoose"
import { ProductTypeDocument } from '@/models/ProductType';
import { UserDocument } from '@/models/User';
import { OrganizationDocument } from '@/models/Organization';

const ProductAttributesSchema = new mongoose.Schema({
    key: {
        required: true,
        type: String
    },
    type: {
        required: true,
        type: String
    },
    code: {
        required: true,
        unique: true,
        type: String
    },
    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization',
    },

    createdAt: {
        type: Date,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

export interface IProductAttributes {
    isDeleted: boolean,
    key: string,
    type: string,
    code: string,
    createBy: UserDocument['_id'],
    productTypeId: ProductTypeDocument['_id'],
    organizationId: OrganizationDocument['_id'],
}
export interface ProductAttributesDocument extends IProductAttributes, Document {

}

// // Virtual populate
// ProductAttributesSchema.virtual("ProductAttributes", {
//     ref: "ProductAttributes",
//     foreignField: "productTypeId",
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

const ProductAttributes: Model<ProductAttributesDocument> = mongoose.models.ProductAttributes || mongoose.model<ProductAttributesDocument>("ProductAttributes", ProductAttributesSchema);

export default ProductAttributes;