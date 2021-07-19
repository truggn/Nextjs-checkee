import isAllowedMethod from "@/utils/is-allowed-method";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { ProductNBFDocument } from "@/models/ProductNBF";
import addproductFlowNBF from "./handlers/addproductFlowNBF";
import getAllProductNBFflow from "./handlers/getAllProductNBFflow";
import removeProductFlowNBF from "./handlers/removeProductFlowNBF";
import { ObjectId } from "mongoose";


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
      const body = null;
      return await handlers["getAllProductNBFflow"]({ req, res, body });
    }
    if (req.method === "POST") {
      const body = { id: req.query.id, ...req.body };
      return await handlers["addproductFlowNBF"]({ req, res, body });
    }
    if (req.method === "PUT") {
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
