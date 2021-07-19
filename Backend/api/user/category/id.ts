import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { CategoryDocument } from "@/models/Category";
import deleteCategory from "./handlers/deleteCategory";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type bodyCategory = {
  id: string;
  deletedBy: string;
};

export type CategoryHandlers = {
  deleteCategory: CheckeeHandler<CategoryDocument, bodyCategory>;
};

const METHODS = ["PUT", "GET"];

const CategoryAPIById: CheckeeApiHandler<CategoryDocument, CategoryHandlers> =
  async (req, res, handlers) => {
    if (!isAllowedMethod(req, res, METHODS)) return;
    try {
      if (req.method === "PUT") {
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

        return await handlers["deleteCategory"]({ req, res, body });
      }
    } catch (error) {
      res
        .status(500)
        .json({ data: null, errors: [{ message: error.message }] });
    }
  };

const handlers = { deleteCategory };

export default createApiHandler(CategoryAPIById, handlers, {});
