import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose, { ObjectId } from "mongoose";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import Product, { ProductDocument } from "@/models/Product";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import deleteStatistic from "./handlers/deleteStatistic";
import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";


interface bodyDelete {
  startDate: Date;
  endDate: Date;
  deletedBy: ObjectId;
}

export type StatisticHandlers = {
  deleteStatistic: CheckeeHandler<
    StatisticDocument[] | StatisticDocument,
    bodyDelete
  >;
};
const METHODS = ["PUT"];

const StatisticAPI: CheckeeApiHandler<
  StatisticDocument[] | StatisticDocument,
  StatisticHandlers
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
      const body = { ...req.body, id: req.query.id };
      return await handlers["deleteStatistic"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { deleteStatistic };

export default createApiHandler(StatisticAPI, handlers, {});
