import mongoose, { Document, Model } from "mongoose";
import { ProductRequestDocument } from '@/models/ProductRequest';


const ProductRequestDetailSchema = new mongoose.Schema({
    code: {
        type: String,
    },
    name: {
        type: String,
    },
    productRequestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductRequest',
    },
    status: {
        type: String,
        enum: ['APPROVED', 'RESECTED', 'PROCESSING'],
        default: 'PROCESSING'
    }
});
export interface IProductRequestDetail {
    code: string,
    name: string,
    productRequestId: ProductRequestDocument['_id'],
};
export interface ProductRequestDetailDocument extends IProductRequestDetail, Document {

}
const ProductRequestDetail: Model<ProductRequestDetailDocument> = mongoose.models.ProductRequestDetail || mongoose.model<ProductRequestDetailDocument>('ProductRequestDetail', ProductRequestDetailSchema)

export default ProductRequestDetail


