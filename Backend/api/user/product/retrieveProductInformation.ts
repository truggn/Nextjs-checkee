import isAllowedMethod from "@/utils/is-allowed-method";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import retrieveProductByCode from "./handlers/retrieveProductByCode";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

interface RetrieveBody {
  code?: string;
}

interface AdditionalInformation {
  [k: string]: any;
}

interface OriginalInformation {
  code: string;
  name: string;
  id: string;
}

export interface ProductInformation
  extends OriginalInformation,
  AdditionalInformation { }

export type RetrieveHandlers = {
  retrieveProductByCode: CheckeeHandler<ProductInformation, RetrieveBody>;
};

const METHODS = ["GET"];

const RetrieveProductInformationAPI: CheckeeApiHandler<
  ProductInformation,
  RetrieveHandlers
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

      const body = req.query;
      return await handlers["retrieveProductByCode"]({ req, res, body });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { retrieveProductByCode };
export default createApiHandler(RetrieveProductInformationAPI, handlers, {});
