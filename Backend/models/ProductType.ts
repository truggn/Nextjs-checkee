import mongoose, { Document, Model } from "mongoose"
import { OrganizationDocument } from '@/models/Organization';
import { UserDocument } from '@/models/User'
import { CategoryDocument } from "@/models/Category";

const ProductTypeSchema = new mongoose.Schema({
    code: {
        required: true,
        unique: true,
        type: String,
    },
    name: {
        required: true,
        type: String
    },

    organizationId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Organization',
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category',
    },
    productRepresentation: {
        public_id: String,
        url: String,
        width: String,
        height: String,
        secure_url: String,
        asset_id: String,
        signature: String,
        bytes: String,
        etag: String,
        created_at: String,
        version_id: String
    },

    images: [
        {
            public_id: String,
            url: String,
            width: String,
            height: String,
            secure_url: String,
            asset_id: String,
            signature: String,
            bytes: String,
            etag: String,
            created_at: String,
            version_id: String
        }
    ],
    price: {
        type: String
    },
    countryOfOrigin: {
        name: String,
        "alpha-2": String,
        "country-code": String
    },
    verified: {
        type: Boolean,
        default: false
    },
    description: {
        type: String
    },
    star: {
        type: Number,
        default: 0
    },
    deletedAt: {
        type: Date,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    verifiedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true, });

export interface Icloudinary {
    public_id: string,
    url: string,
    width: string,
    height: string,
    secure_url: string,
    asset_id: string,
    signature: string,
    bytes: string,
    etag: string,
    created_at: string,
    version_id: string
}

export interface IProductType {
    code: string,
    name: string,
    productRepresentation: Icloudinary,
    images: Icloudinary[],
    price: string,
    countryOfOrigin: string,
    verified: boolean,
    description: string,
    organizationId: OrganizationDocument['_id'],
    categoryId: CategoryDocument['_id'],
    star: number,
    isDeleted: boolean,
    createdBy: UserDocument['_id'],
    updatedBy: UserDocument['_id'],
    deletedBy: UserDocument['_id'],
    verifiedBy: UserDocument['_id']
}
export interface ProductTypeDocument extends IProductType, Document {

}

const ProductType: Model<ProductTypeDocument> = mongoose.models.ProductType || mongoose.model<ProductTypeDocument>("ProductType", ProductTypeSchema);

export default ProductType;