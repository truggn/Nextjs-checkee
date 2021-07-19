import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose, { ObjectId } from "mongoose";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import Product, { ProductDocument } from "@/models/Product";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import createStatistic from "./handlers/createStatistic";
import updateStatistic from "./handlers/updateStatistic";
import getAllStatistic from "./handlers/getAllStatistic";


interface bodyCreated {
  startDate: Date;
  endDate: Date;
  createdBy: ObjectId;
}
interface bodyUpdated {
  startDate: Date;
  endDate: Date;
  updatedBy: ObjectId;
}

export type StatisticHandlers = {
  createStatistic: CheckeeHandler<
    StatisticDocument[] | ProductDocument[] | StatisticDocument,
    bodyCreated
  >;
  getAllStatistic: CheckeeHandler<StatisticDocument[] | StatisticDocument>;
  updateStatistic: CheckeeHandler<
    StatisticDocument[] | StatisticDocument,
    bodyUpdated
  >;
};
const METHODS = ["POST", "GET", "PUT"];

const StatisticAPI: CheckeeApiHandler<
  StatisticDocument[] | StatisticDocument,
  StatisticHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    if (req.method === "GET") {
      const body = { ...req.body, id: req.query.id };
      return await handlers["getAllStatistic"]({ req, res, body });
    }
    if (req.method === "POST") {
      const body = { ...req.body, id: req.query.id };
      return await handlers["createStatistic"]({ req, res, body });
    }
    if (req.method === "PUT") {
      const body = { ...req.body, id: req.query.id };
      return await handlers["updateStatistic"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { createStatistic, updateStatistic, getAllStatistic };

export default createApiHandler(StatisticAPI, handlers, {});
