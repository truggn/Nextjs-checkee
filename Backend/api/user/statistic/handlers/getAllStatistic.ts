import dbConnect from "@/utils/dbConnect";
import Organization, { OrganizationDocument } from "@/models/Organization";
import ProductFlow, { ProductFlowDocument } from "@/models/ProductFlow";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../index";

const getAllStatistic: StatisticHandlers["getAllStatistic"] = async ({
  req,
  res,
  body,
}) => {
  try {
    await dbConnect();
    const data = await Statistic.find()
      .where({ isDeleted: false })
      .select(" productTypeName numberCreated createdAt")
      .populate({
        path: "organizationId",
        select: "name_customer",
        model: Organization,
      })
      .populate({
        path: "productFlowId",
        select: "name",
        model: ProductFlow,
      });
    if (data.length == 0) {
      return res.status(500).json({
        data: null,
        errors: [
          {
            message: "No statistics!",
          },
        ],
      });
    } else {
      return res.status(200).json({
        data: data,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      data: null,
      errors: [
        {
          message: error.message,
        },
      ],
    });
  }
};

export default getAllStatistic;
