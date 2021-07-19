import isAllowedMethod from "@/utils/is-allowed-method";
import { ProductDocument } from "@/models/Product";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import getProductByCode from "./handlers/getProductByCode";
export type Body = {
  code: string;
};

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type ProductHandlers = {
  getProductByCode: CheckeeHandler<ProductDocument[], Body>;
};
const METHODS = ["POST", "GET", "PUT"];
const ProductAPI: CheckeeApiHandler<ProductDocument[], ProductHandlers> =
  async (req, res, handlers) => {
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

        const body = { ...req.body };
        return await handlers["getProductByCode"]({ req, res, body });
      }
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ data: null, errors: [{ message: error.message }] });
    }
  };

export const handlers = { getProductByCode };
export default createApiHandler(ProductAPI, handlers, {});
