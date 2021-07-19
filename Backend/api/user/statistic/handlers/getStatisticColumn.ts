import dbConnect from "@/utils/dbConnect";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import Organization, { OrganizationDocument } from "@/models/Organization";
import { StatisticHandlers } from "../column";

const getStatisticColumn: StatisticHandlers["getStatisticColumn"] = async ({
  req,
  res,
  body: { ...resbody },
}) => {
  try {
    await dbConnect();
    const startDate = new Date(resbody.startDate);
    const endDate = new Date(resbody.endDate);
    endDate.setHours(23, 59, 59, 999);

    const data = await Statistic.find({
      organizationId: resbody.id,
    })
      .select("productTypeName numberCreated")
      .where({
        $and: [
          { startDate: { $gte: startDate } },
          { endDate: { $lte: endDate } },
          { isDeleted: false },
        ],
      });
    /**
     * nếu chưa có thống kê
     */
    if (data.length == 0) {
      const _data: any[] = [{ numberCreated: 0, organizationId: resbody.id }];

      const _dataName = await Statistic.populate(_data, {
        path: "organizationId",
        select: "name_customer",
        model: Organization,
      });

      return res.status(200).json({
        data: _dataName as any,
      });
    }
    return res.status(200).json({
      data: data as any,
    });
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

export default getStatisticColumn;
