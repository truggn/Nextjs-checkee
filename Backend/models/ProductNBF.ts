import mongoose, { Document, Model } from "mongoose";
import { ProductTypeDocument } from '@/models/ProductType';
import { OrganizationDocument } from '@/models/Organization';
import { ProductDocument } from '@/models/Product';

/**
 * Sản phẩm chưa thuộc quy trình
 */
const ProductNBFSchema = new mongoose.Schema({
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

export interface ProductNBF {
    code: string,
    name: string,
    productTypeId: ProductTypeDocument['_id'],
    organizationId: OrganizationDocument['_id'],
    productId: ProductDocument['_id']
}

export interface ProductNBFDocument extends ProductNBF, Document {

}

/**
 * Sản phẩm chưa thuộc quy trình
 */
const ProductNBF: Model<ProductNBFDocument> = mongoose.models.ProductNBF || mongoose.model<ProductNBFDocument>('ProductNBF', ProductNBFSchema)

export default ProductNBF