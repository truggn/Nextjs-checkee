import mongoose, { Document, Model } from "mongoose";
import { UserDocument } from "@/models/User";
import { ProductTypeDocument } from "@/models/ProductType";
import { OrganizationDocument } from "@/models/Organization";
import { ProductFlowDocument } from "@/models/ProductFlow";

const StatisticSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    numberCreated: {
      type: Number,
      default: 0,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
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
    isDeleted: {
      type: Boolean,
      default: false,
    },
    productTypeName: {
      _id: String,
      name: String,
    },
  },
  { timestamps: true }
);
interface IproductTypeName {
  _id: string;
  name: string;
}

export interface _Statistic {
  startDate: Date;
  endDate: Date;
  numberCreated: number;
  createdBy: UserDocument["_id"];
  updatedBy: UserDocument["_id"];
  deletedBy: UserDocument["_id"];
  productTypeId: ProductTypeDocument["_id"];
  organizationId: OrganizationDocument["_id"];
  productFlowId: ProductFlowDocument["_id"];
  productTypeName: IproductTypeName;
}

export interface StatisticDocument extends _Statistic, Document {}

const Statistic: Model<StatisticDocument> =
  mongoose.models.Statistic ||
  mongoose.model<StatisticDocument>("Statistic", StatisticSchema);

export default Statistic;
