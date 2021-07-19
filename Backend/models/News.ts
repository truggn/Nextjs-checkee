import mongoose, { Document, Model } from "mongoose"
import { UserDocument } from '@/models/User';


const NewsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true
    },
    description: {
        type: String
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

    isDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, { timestamps: true });

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
export interface INews {
    title: string,
    content: string,
    description: string,
    images: Icloudinary[],
    createdBy: UserDocument['_id'];
    updatedBy: UserDocument['_id'];
}
export interface NewsDocument extends INews, Document {

}

const News: Model<NewsDocument> = mongoose.models.News || mongoose.model<NewsDocument>("News", NewsSchema);

export default News;