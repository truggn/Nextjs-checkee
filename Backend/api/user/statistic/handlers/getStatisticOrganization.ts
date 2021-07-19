import dbConnect from "@/utils/dbConnect";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import Organization, { OrganizationDocument } from "@/models/Organization";
import { StatisticHandlers } from "../total";

const getStatisticOrganization: StatisticHandlers["getStatisticOrganization"] =
  async ({ req, res, body: { ...resbody } }) => {
    try {
      await dbConnect();

      const startDate = new Date(resbody.startDate);
      const endDate = new Date(resbody.endDate);
      endDate.setHours(23, 59, 59, 999);

      const findWithDate = await Statistic.aggregate()
        .match({
          $and: [
            { startDate: { $gte: startDate } },
            { endDate: { $lte: endDate } },
          ],
        })
        .group({
          _id: {
            organizationId: "$organizationId",
            month: { $month: "$startDate" },
          },
          numberCreated: { $sum: "$numberCreated" },
        });
      /**
       *Map 1 mảng mới chứa tất cả thống tin được group (tổng số lượng theo ngày)
       */
      const newProductsDay = findWithDate.map((product) => ({
        ...product._id,
        numberCreated: product.numberCreated,
      }));
      /**
       * Tổng sản phẩm thời điểm hiện tại
       */
      const Monthstart = startDate.getMonth() + 1;
      const Yearstart = startDate.getFullYear();
      const startD = new Date(Monthstart + "-" + 1 + "-" + Yearstart);

      let _data: any[] = [];

      for (let i = 0; i < newProductsDay.length; i++) {
        const findTotal = await Statistic.aggregate()
          .match({
            $and: [
              { startDate: { $gte: startD } },
              { endDate: { $lte: endDate } },
              { organizationId: newProductsDay[i].organizationId },
            ],
          })
          .group({
            _id: {
              organizationId: "$organizationId",
              month: { $month: "$startDate" },
            },
            numberCreated: { $sum: "$numberCreated" },
          })
          .then((items) => items[0]);
        _data.push(findTotal);
      }
      /**
       *Map 1 mảng mới chứa tất cả thống tin được group (tổng số lượng từ ngày 1 của tháng đến ngày cuối cùng được chọn)
       */
      const newProductsTotal = _data.map((item) => ({
        ...item._id,
        numberTotal: item.numberCreated,
      }));
      /**
       * Nếu Sản phẩm được gom nhóm = 0 (Chưa có thống kê trong tháng)
       */
      if (newProductsDay.length == 0 || newProductsTotal.length == 0) {
        const _datatotal: any[] = [{ numberCreated: 0, numberTotal: 0 }];
        return res.status(200).json({
          data: _datatotal as any,
        });
      }
      /**
       * Hợp nhất 2 arr newProductsTotal , newProductsDay thành 1 Arr chứa numberTotal ,numberCreated
       */
      const findTotal = newProductsDay.map((product) => {
        const findIndex = newProductsTotal.findIndex(
          (item) =>
            String(item.organizationId) === String(product.organizationId)
        );
        if (findIndex !== -1) {
          return {
            ...product,
            numberTotal: newProductsTotal[findIndex].numberTotal,
          };
        }
        return product;
      });
      /**
       * Lấy ra tên của loại sản phẩm
       */
      await Statistic.populate(findTotal, {
        path: "organizationId",
        select: "name_customer",
        model: Organization,
      });

      return res.status(200).json({
        data: findTotal,
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

export default getStatisticOrganization;
