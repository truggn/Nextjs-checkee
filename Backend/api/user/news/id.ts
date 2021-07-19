import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { NewsDocument } from "@/models/News";
import deleteNews from "./handlers/deleteNews";
import getDataNewsById from "./handlers/getDataById";

import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";

interface bodyNews {
  id: string | string[];
  deletedBy: string;
}

export type NewsHandlers = {
  deleteNews: CheckeeHandler<NewsDocument, bodyNews>;
  getDataNewsById: CheckeeHandler<NewsDocument>;
};

const METHODS = ["PUT", "GET"];

const NewsAPIById: CheckeeApiHandler<NewsDocument, NewsHandlers> = async (
  req,
  res,
  handlers
) => {
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
      return await handlers["deleteNews"]({ req, res, body });
    }
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
      return await handlers["getDataNewsById"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

const handlers = { deleteNews, getDataNewsById };

export default createApiHandler(NewsAPIById, handlers, {});
