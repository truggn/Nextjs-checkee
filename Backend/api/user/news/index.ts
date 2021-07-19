import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { NewsDocument } from "@/models/News";
import createNews from "./handlers/createNews";
import getDataNews from "./handlers/getDataNews";
import updateNews from "./handlers/updateNews";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

export type bodyNews = {
  title: string;
  content: string;
  description: string;
  images: string[];
  createdBy: mongoose.Schema.Types.ObjectId;
};
export type bodyUpdateNews = {
  id: string;
  title: string;
  content: string;
  description: string;
  images: string[];
  updatedBy: mongoose.Schema.Types.ObjectId;
};
export type queryParam = {
  page: number;
};

export type NewsHandlers = {
  createNews: CheckeeHandler<NewsDocument, bodyNews>;
  updateNews: CheckeeHandler<NewsDocument, bodyUpdateNews>;
  getDataNews: CheckeeHandler<NewsDocument[], queryParam>;
};

const METHODS = ["GET", "POST", "PUT"];

const newsAPI: CheckeeApiHandler<NewsDocument[] | NewsDocument, NewsHandlers> =
  async (req, res, handlers) => {
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

        const body = { page: req.query.page, ...req.body };
        return await handlers["getDataNews"]({ req, res, body });
      }
      if (req.method === "POST") {
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

        const body = { ...req.body };
        return await handlers["createNews"]({ req, res, body });
      }
      if (req.method === "PUT") {
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

        const body = { ...req.body };
        return await handlers["updateNews"]({ req, res, body });
      }
    } catch (error) {
      res
        .status(500)
        .json({ data: null, errors: [{ message: error.message }] });
    }
  };

const handlers = { createNews, getDataNews, updateNews };

export default createApiHandler(newsAPI, handlers, {});
