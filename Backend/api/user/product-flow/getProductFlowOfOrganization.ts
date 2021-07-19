import isAllowedMethod from "@/utils/is-allowed-method";

import { ProductFlowDocument } from "@/models/ProductFlow";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import getProductFlowOfOrganization from "./handlers/getProductFlowOfOrganization";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type ProductFlowHandlers = {
  getProductFlowOfOrganization: CheckeeHandler<ProductFlowDocument[]>;
};

const METHODS = ["GET"];

const ProductFlowAPI: CheckeeApiHandler<
  ProductFlowDocument[],
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
      return await handlers["getProductFlowOfOrganization"]({ req, res, body });
    }

    // if (req.method === 'PUT') {
    //     const body = { ...req.body };
    //     return await handlers['updateParticipant']({ req, res, body })
    // }

    // if (req.method === 'DELETE') {
    //     const body = { ...req.body };
    //     return await handlers['deleteParticipant']({ req, res, body })
    // }
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getProductFlowOfOrganization };

export default createApiHandler(ProductFlowAPI, handlers, {});
