import isAllowedMethod from "@/utils/is-allowed-method";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { ProductNBFDocument } from "@/models/ProductNBF";
import { ProductDocument } from "@/models/Product";
import addproductFlowNBF from "./handlers/addproductFlowNBF";
import getAllProductNBFflow from "./handlers/getAllProductNBFflow";
import removeProductFlowNBF from "./handlers/removeProductFlowNBF";
import { ObjectId } from "mongoose";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

interface BodyConfirm {
  id: string | string[];
  productFlowId: string;
  product: string[];
}
interface BodyUpdate {
  id: ObjectId;
  productFlowId: string;
  product: string[];
}
export type ProductNBFflowHandler = {
  addproductFlowNBF: CheckeeHandler<ProductNBFDocument[], BodyConfirm>;
  removeProductFlowNBF: CheckeeHandler<ProductNBFDocument[], BodyUpdate>;
  getAllProductNBFflow: CheckeeHandler<ProductNBFDocument[]>;
};
const METHODS = ["POST", "GET", "PUT"];

const ProductFlowNBFAPI: CheckeeApiHandler<
  ProductNBFDocument[] | ProductNBFDocument,
  ProductNBFflowHandler
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
      return await handlers["getAllProductNBFflow"]({ req, res, body });
    }
    if (req.method === "POST") {
      /**
       * Kiểm tra role cho từng handler
       */
      const athz = await authorize(req, [ROLES.NORMAL, ROLES.SUPERADMIN]);
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors,
        });
      }

      const body = { id: req.query.id, ...req.body };
      return await handlers["addproductFlowNBF"]({ req, res, body });
    }
    if (req.method === "PUT") {
      /**
       * Kiểm tra role cho từng handler
       */
      const athz = await authorize(req, [ROLES.SUPERADMIN]);
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors,
        });
      }

      const body = { id: req.query.id, ...req.body };
      return await handlers["removeProductFlowNBF"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};
const handlers = {
  getAllProductNBFflow,
  addproductFlowNBF,
  removeProductFlowNBF,
};
export default createApiHandler(ProductFlowNBFAPI, handlers, {});
