import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { CategoryDocument } from "@/models/Category";
import getDetailAllCategory from "./handlers/getDetailAllCategory";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type CategoryHandlers = {
  getDetailAllCategory: CheckeeHandler<CategoryDocument[]>;
};

const METHODS = ["GET"];

const DetailAllCategoryAPI: CheckeeApiHandler<
  CategoryDocument | CategoryDocument[],
  CategoryHandlers
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

      const body = { id: req.query.id, ...req.body };

      return await handlers["getDetailAllCategory"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

const handlers = { getDetailAllCategory };

export default createApiHandler(DetailAllCategoryAPI, handlers, {});
