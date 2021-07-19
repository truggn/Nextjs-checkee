import dbConnect from "@/utils/dbConnect";
import type { ProductTypeHandlers } from "../id";
import ProductType from "@/models/ProductType";
import Organization from "@/models/Organization";
import mongoose from "mongoose";

const getProductTypeRanDom: ProductTypeHandlers["getProductTypeRanDom"] =
  async ({ res, req, body: { id } }) => {
    try {
      await dbConnect();

      const _id = mongoose.Types.ObjectId(id);

      const findRanDom = await ProductType.aggregate([
        { $match: { organizationId: _id } },
        { $sample: { size: 10 } },
        { $project: { productRepresentation: 1, name: 1 } },
      ]);

      return res.status(200).json({
        data: findRanDom,
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        errors: [{ message: error.message }],
      });
    }
  };

export default getProductTypeRanDom;
