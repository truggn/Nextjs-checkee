import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { CategoryDocument } from "@/models/Category";
import createCategory from "./handlers/createCategory";
import getDataCategory from "./handlers/getDataCategory";
import updateCategory from "./handlers/updateCategory";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type bodyCategory = {
  code: string;
  name: string;
  description: string;
  icon: string;
  level: number;
  isHomeCategory: boolean;
  indexHomeCategory: number;
  subcategoryId: mongoose.Schema.Types.Mixed[];
  parentsId: {
    idCategoryLevel_1: mongoose.Schema.Types.ObjectId;
    idCategoryLevel_2: mongoose.Schema.Types.ObjectId;
  };
  createdBy: mongoose.Schema.Types.ObjectId;
};

export type bodyUpdateCategory = {
  id: string;
  code: string;
  name: string;
  description: string;
  icon: string;
  isHomeCategory: boolean;
  indexHomeCategory: number;
  updatedBy: mongoose.Schema.Types.ObjectId;
};

export type CategoryHandlers = {
  createCategory: CheckeeHandler<CategoryDocument, bodyCategory>;
  updateCategory: CheckeeHandler<CategoryDocument, bodyUpdateCategory>;
  getDataCategory: CheckeeHandler<CategoryDocument[]>;
};

const METHODS = ["GET", "POST", "PUT"];

const categoryAPI: CheckeeApiHandler<
  CategoryDocument[] | CategoryDocument,
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
      return await handlers["getDataCategory"]({ req, res, body });
    }
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
      return await handlers["createCategory"]({ req, res, body });
    }
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

      const body = { ...req.body };
      return await handlers["updateCategory"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

const handlers = { createCategory, getDataCategory, updateCategory };

export default createApiHandler(categoryAPI, handlers, {});
