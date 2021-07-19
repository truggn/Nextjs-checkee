import isAllowedMethod from "@/utils/is-allowed-method";
import { ProductFlowDocument } from "@/models/ProductFlow";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import getProductFlowById from "./handlers/getProductFlowById";
import deleteProductFlow from "./handlers/deleteProductFlow";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type ProductFlowHandlers = {
  getProductFlowById: CheckeeHandler<ProductFlowDocument>;
  deleteProductFlow: CheckeeHandler<ProductFlowDocument>;
};

const METHODS = [/* 'POST',  */ "GET", /* 'PUT', */ "DELETE"];

const ProductFlowIdAPI: CheckeeApiHandler<
  ProductFlowDocument,
  ProductFlowHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    // if (req.method === 'POST') {
    //     const body = { ...req.body }
    //     return await handlers['addParticipant']({ req, res, /* config, */ body })
    // }

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
      return await handlers["getProductFlowById"]({ req, res, body });
    }

    // // if (req.method === 'PUT') {
    // //     const body = { ...req.body };
    // //     return await handlers['updateParticipant']({ req, res, body })
    // // }

    if (req.method === "DELETE") {
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

      const body = null;
      return await handlers["deleteProductFlow"]({ req, res, body });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getProductFlowById, deleteProductFlow };

export default createApiHandler(ProductFlowIdAPI, handlers, {});
