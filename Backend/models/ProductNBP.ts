import mongoose, { Document, Model } from "mongoose";
import { ProductTypeDocument } from '@/models/ProductType';
import { OrganizationDocument } from '@/models/Organization';
import { ProductDocument } from '@/models/Product'

/**
 * Sản phẩm chưa được duyệt
 */
const ProductNBPSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    productTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductType',
    },
    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    }
}, { timestamps: true });

export interface ProductNBP {
    code: string,
    name: string,
    productTypeId: ProductTypeDocument['_id'],
    organizationId: OrganizationDocument['_id'],
    productId: ProductDocument['_id']
}

export interface ProductNBPDocument extends ProductNBP, Document {

}

/**
 * Sản phẩm chưa được duyệt
 */
const ProductNBP: Model<ProductNBPDocument> = mongoose.models.ProductNBP || mongoose.model<ProductNBPDocument>('ProductNBP', ProductNBPSchema)

export default ProductNBP