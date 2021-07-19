import isAllowedMethod from "@/utils/is-allowed-method";
import { ProductTypeDocument } from "@/models/ProductType";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import updateProductType from "./handlers/updateProductType";
import getProductTypeRanDom from "./handlers/getProductTypeRanDom";
import getNewProductTypeOfOrganization from "./handlers/getNewProductTypeOfOrganization";
import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";


interface bodyProductType {
  id: string;
  name: string;
  categoryId: string;
  productRepresentation: string;
  images: string[];
  price: string;
  countryOfOrigin: string;
  description: string;
  updatedBy: string;
}

interface BodyGetProd {
  id: string
}

export type ProductTypeHandlers = {
  updateProductType: CheckeeHandler<ProductTypeDocument, bodyProductType>;
  getProductTypeRanDom: CheckeeHandler<ProductTypeDocument[], BodyGetProd>;
  getNewProductTypeOfOrganization: CheckeeHandler<ProductTypeDocument[], BodyGetProd>;
};

const METHODS = ["GET", "PUT"];

const ProductTypeIdAPI: CheckeeApiHandler<
  ProductTypeDocument | ProductTypeDocument[],
  ProductTypeHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {

    if (req.method === "PUT") {
      const athz = await authorize(req, [ROLES.NORMAL])
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors
        })
      };
      const body = { ...req.body };
      return await handlers["updateProductType"]({ req, res, body });
    }
    if (req.method === "GET") {
      const athz = await authorize(req, [ROLES.NORMAL])
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors
        })
      };
      if (req.query.random === 'true') {
        const body = { ...req.body, id: req.query.id }
        return await handlers["getProductTypeRanDom"]({ req, res, body })
      } else {
        const body = { ...req.body, id: req.query.id };
        return await handlers['getNewProductTypeOfOrganization']({ req, res, body })
      }
    }
  } catch (error) {

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { updateProductType, getProductTypeRanDom, getNewProductTypeOfOrganization };

export default createApiHandler(ProductTypeIdAPI, handlers, {});
