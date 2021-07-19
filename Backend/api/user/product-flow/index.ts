import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";

import { ProductFlowDocument } from "@/models/ProductFlow";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import createProductFlow from "./handlers/createProductFlow";
import getAllProductFlow from "./handlers/getAllProductFlow";
import updateDProductFlowDocument from "./handlers/updateProductFlow";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

interface bodyProductFlow {
  name: string;
  code: string;
  productTypeId: string;
  organizationId: string;
  createdBy: string;
  flow: string[];
}

export type ProductFlowHandlers = {
  createProductFlow: CheckeeHandler<ProductFlowDocument[], bodyProductFlow>;
  getAllProductFlow: CheckeeHandler<ProductFlowDocument[]>;
  updateDProductFlowDocument: CheckeeHandler<ProductFlowDocument[]>;
};

const METHODS = ["POST", "GET", "PUT", "DELETE"];

const ProductFlowAPI: CheckeeApiHandler<
  ProductFlowDocument[],
  ProductFlowHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    if (req.method === "POST") {
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
      return await handlers["createProductFlow"]({
        req,
        res,
        /* config, */ body,
      });
    }

    if (req.method === "GET") {
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

      const body = null;
      return await handlers["getAllProductFlow"]({ req, res, body });
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

      const body = { ...req.body };
      return await handlers["updateDProductFlowDocument"]({ req, res, body });
    }

    // if (req.method === 'DELETE') {
    //     const body = { ...req.body };
    //     return await handlers['deleteParticipant']({ req, res, body })
    // }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = {
  createProductFlow,
  getAllProductFlow,
  updateDProductFlowDocument,
};

export default createApiHandler(ProductFlowAPI, handlers, {});
