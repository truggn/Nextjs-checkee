import mongoose, { Document, Model } from "mongoose";
import { UserDocument } from "@/models/User";
import { ProductTypeDocument } from "@/models/ProductType";
import { OrganizationDocument } from "@/models/Organization";
import { ProductFlowDocument } from "@/models/ProductFlow";

const ProductSchema = new mongoose.Schema(
  {
    code: {
      required: [true, "Code is required!"],
      unique: true,
      type: String,
    },
    name: {
      type: String,
    },
    date: {
      type: Date,
    },
    weight: {
      type: Number,
    },
    color: {
      type: String,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      // required : true,
      ref: "Organization",
    },

    productTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductType",
    },

    productFlowId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProductFlow",
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true, strict: false }
);

export interface IProduct {
  name: string;
  code: string;
  weight: number;
  createBy: UserDocument["_id"];
  date: Date;
  productTypeId: ProductTypeDocument["_id"];
  organizationId: OrganizationDocument["_id"];
  productFlowId: ProductFlowDocument["_id"];
  createdAt: Date;
}

export interface ProductDocument extends IProduct, Document {}

const Product: Model<ProductDocument> =
  mongoose.models.Product ||
  mongoose.model<ProductDocument>("Product", ProductSchema);

export default Product;
