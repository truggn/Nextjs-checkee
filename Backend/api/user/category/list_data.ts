import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { CategoryDocument } from "@/models/Category";
import getListCategory from "./handlers/getListCategory";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type CategoryHandlers = {
  getListCategory: CheckeeHandler<CategoryDocument[]>;
};

const METHODS = ["GET"];

const ListCategoryAPI: CheckeeApiHandler<
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

      const body = { ...req.body };

      return await handlers["getListCategory"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

const handlers = { getListCategory };

export default createApiHandler(ListCategoryAPI, handlers, {});
