import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose, { ObjectId } from "mongoose";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
interface bodyGet {
  startDate: Date;
  endDate: Date;
  id: string;
}
import getStatisticRound from "./handlers/getStatisticRound";



export type StatisticHandlers = {
  getStatisticRound: CheckeeHandler<
    StatisticDocument[] | StatisticDocument,
    bodyGet
  >;
};
const METHODS = ["GET"];

const StatisticAPI: CheckeeApiHandler<
  StatisticDocument[] | StatisticDocument,
  StatisticHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    if (req.method === "GET") {
      const body = {
        ...req.body,
        id: req.query.id,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };
      return await handlers["getStatisticRound"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getStatisticRound };

export default createApiHandler(StatisticAPI, handlers, {});
