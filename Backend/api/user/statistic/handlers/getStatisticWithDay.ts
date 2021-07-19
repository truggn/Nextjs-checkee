import dbConnect from "@/utils/dbConnect";
import Organization, { OrganizationDocument } from "@/models/Organization";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../day";
import mongoose from "mongoose";
const getStatisticWithDay: StatisticHandlers["getStatisticWithDay"] = async ({
  req,
  res,
  body: { ...resbody },
}) => {
  try {
    await dbConnect();

    const startDate = new Date(resbody.startDate);
    const endDate = new Date(resbody.endDate);
    endDate.setHours(23, 59, 59, 999);

    const id = mongoose.Types.ObjectId(resbody.id);

    const findWithDate = await Statistic.aggregate()
      .match({
        $and: [
          { startDate: { $gte: startDate } },
          { endDate: { $lte: endDate } },
          { organizationId: id },
        ],
      })
      .group({
        _id: {
          organizationId: "$organizationId",
          day: { $dayOfMonth: "$endDate" },
          month: { $month: "$startDate" },
          year: { $year: "$startDate" },
        },
        numberCreated: { $sum: "$numberCreated" },
      });

    const newProducts = findWithDate.map((product) => ({
      ...product._id,
      numberCreated: product.numberCreated,
    }));
    /**
     * Lấy ra tên đối tác
     */
    await Statistic.populate(newProducts, {
      path: "organizationId",
      select: "name_customer",
      model: Organization,
    });

    /**
     * Nếu Sản phẩm được gom nhóm = 0 (Chưa có thống kê trong tháng)
     */
    if (newProducts.length == 0) {
      const month = startDate.getMonth() + 1;
      const day = startDate.getDate();
      const year = startDate.getFullYear();
      const _data: any[] = [
        { numberCreated: 0, organizationId: resbody.id, day, month, year },
      ];

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
      data: newProducts as any,
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

export default getStatisticWithDay;
