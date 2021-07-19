import mongoose, { Document, Model } from "mongoose";
import { ProductTypeDocument } from '@/models/ProductType';
import { OrganizationDocument } from '@/models/Organization';
import { UserDocument } from '@/models/User'

const ProductRequestSchema = new mongoose.Schema({
    filename: {
        type: String,
    },
    status: {
        type: String,
        enum: [
            'INIT', 'CONFIRMED', 'PROCESSING',
            'DELIVERING', 'DELIVERED', 'COMPLETED',
            'CANCELLED', 'ERROR', 'REMOVE',
        ],
        default: 'INIT',
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User',
    },
    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    products: [{
        code: String,
        name: String,
    }]
}, { timestamps: true });

interface IProduct {
    _id: string;
    code: string;
    name: string;
}

export interface IProductRequest {
    filename: string,
    productTypeId: ProductTypeDocument['_id'],
    organizationId: OrganizationDocument['_id'],
    products: IProduct[],
    createdBy: UserDocument['_id'],
}

export interface ProductRequestDocument extends IProductRequest, Document {

}

const ProductRequest: Model<ProductRequestDocument> = mongoose.models.ProductRequest || mongoose.model<ProductRequestDocument>('ProductRequest', ProductRequestSchema)

export default ProductRequest