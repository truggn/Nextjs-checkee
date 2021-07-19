import isAllowedMethod from "@/utils/is-allowed-method";
import { OrganizationDocument } from "@/models/Organization";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import exportDataCustomer from "./handlers/exportCustomer";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type CustomerHandlers = {
  exportDataCustomer: CheckeeHandler<OrganizationDocument[]>;
};

const METHODS = ["POST", "GET"];

const exportCustomer: CheckeeApiHandler<
  OrganizationDocument[],
  CustomerHandlers
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
      return await handlers["exportDataCustomer"]({
        req,
        res,
        /* config, */ body,
      });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { exportDataCustomer };

export default createApiHandler(exportCustomer, handlers, {});
