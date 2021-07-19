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
}
import getStatisticOrganization from "./handlers/getStatisticOrganization";
import { ROLES } from "@authorization/role";
import authorize from "@authorization/authorize";


export type StatisticHandlers = {
  getStatisticOrganization: CheckeeHandler<
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
      const athz = await authorize(req, [ROLES.NORMAL])
      if (!athz.isAuthorized) {
        return res.status(athz.status).json({
          data: null,
          errors: athz.errors
        })
      };
      const body = {
        ...req.body,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
      };
      return await handlers["getStatisticOrganization"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getStatisticOrganization };

export default createApiHandler(StatisticAPI, handlers, {});
