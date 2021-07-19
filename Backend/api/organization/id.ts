import isAllowedMethod from "@/utils/is-allowed-method";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import getProductOrganization from "./handlers/getProductOrganization";

import { OrganizationDocument } from "@/models/Organization";
import { ProductTypeDocument } from "@/models/ProductType";




export type OrganizationIdHandlers = {
  getProductOrganization: CheckeeHandler<
    OrganizationDocument[] | ProductTypeDocument[]
  >;
};

const METHODS = ["GET"];

const organizationIdApi: CheckeeApiHandler<
  OrganizationDocument[] | ProductTypeDocument[],
  OrganizationIdHandlers
> = async (
  req,
  res,
  // config,
  handlers
) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
      if (req.method === "GET") {
        const body = { ...req.body, id: req.query.id };
        return await handlers["getProductOrganization"]({ req, res, body });
      }
    } catch (error) {
      res.status(500).json({ data: null, errors: [{ message: error.message }] });
    }
  };

const handlers = { getProductOrganization };

export default createApiHandler(organizationIdApi, handlers, {});
