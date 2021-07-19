import dbConnect from "@/utils/dbConnect";
import Organization, { OrganizationDocument } from "@/models/Organization";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../month";
import mongoose from "mongoose";
const getStatisticWithMonth: StatisticHandlers["getStatisticWithMonth"] =
  async ({ req, res, body: { ...resbody } }) => {
    try {
      await dbConnect();

      /**
       * Nhập 1 ngày bất kì trong tháng lấy ra ngày đầu tiên và ngày cuối cùng trong tháng tính số lượng
       */
      const start = new Date(resbody.startDate);
      const end = new Date(resbody.endDate);
      const Monthstart = start.getMonth() + 1;
      const Yearstart = start.getFullYear();
      const Monthend = end.getMonth() + 1;
      const Yearend = end.getFullYear();
      const startDate = new Date(Monthstart + "-" + 1 + "-" + Yearstart);
      const endDate = new Date(Yearend, Monthend, 0);
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
       * Lấy ra tên của loại sản phẩm
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

export default getStatisticWithMonth;
