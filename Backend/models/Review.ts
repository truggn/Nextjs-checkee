import mongoose, { Document, Model } from "mongoose";
import { UserDocument } from "@/models/User";
import { ProductTypeDocument } from "@/models/ProductType";

const ReviewSchema = new mongoose.Schema(
  {
    quality: {
      type: Number,
      min: 1,
      max: 5,
    },
    worththemoney: {
      type: Number,
      min: 1,
      max: 5,
    },
    effectiveuse: {
      type: Number,
      min: 1,
      max: 5,
    },
    reuse: {
      type: Number,
      min: 1,
      max: 5,
    },
    sharefriend: {
      type: Number,
      min: 1,
      max: 5,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
    },
    image: [
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
        version_id: String,
      },
    ],
    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },

    star: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);
export interface Icloudinary {
  public_id: string;
  url: string;
  width: string;
  height: string;
  secure_url: string;
  asset_id: string;
  signature: string;
  bytes: string;
  etag: string;
  created_at: string;
  version_id: string;
}

export interface IReviews {
  quality: number;
  worththemoney: number;
  effectiveuse: number;
  reuse: number;
  sharefriend: number;
  comment: string;
  star: number;
  image: Icloudinary[];
  userId: UserDocument["_id"];
  productTypeId: ProductTypeDocument["_id"];
}
export interface ReviewsDocument extends IReviews, Document {}

const Review: Model<ReviewsDocument> =
  mongoose.models.Review ||
  mongoose.model<ReviewsDocument>("Review", ReviewSchema);

export default Review;
