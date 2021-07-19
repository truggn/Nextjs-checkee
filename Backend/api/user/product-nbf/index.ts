import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import ProductNBF, { ProductNBFDocument } from "@/models/ProductNBF";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import getAllProductNBF from "./handlers/getAllProductNBF";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type ProductNBFHandlers = {
  getAllProductNBF: CheckeeHandler<ProductNBFDocument[]>;
};
const METHODS = ["GET"];

const ProductNBFAPI: CheckeeApiHandler<
  ProductNBFDocument[],
  ProductNBFHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    if (req.method === "GET") {
      /**
       * Kiểm tra role cho từng handler
       */
      const athz = await authorize(req, [ROLES.NORMAL]);
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors,
        });
      }

      const body = null;
      return await handlers["getAllProductNBF"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getAllProductNBF };

export default createApiHandler(ProductNBFAPI, handlers, {});
