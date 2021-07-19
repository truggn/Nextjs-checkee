import dbConnect from "@/utils/dbConnect";
import Product, { ProductDocument } from "@/models/Product";
import ProductType, { ProductTypeDocument } from "@/models/ProductType";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../index";
import { format } from "date-fns";

const createStatistic: StatisticHandlers["createStatistic"] = async ({
  req,
  res,
  body: { createdBy, ...restBody },
}) => {
  try {
    await dbConnect();

    // const dateNow = new Date(format(new Date(), "MM/dd/yyyy"));
    let startDate = new Date(restBody.startDate);
    let endDate = new Date(restBody.endDate);
    endDate.setHours(23, 59, 59, 999);

    /**
     * Trường hợp bỏ qua ngày bắt đầu và kết thúc , thống kê trước ngày hiện tại
     */

    if (req.body.startDate.length == 0 || req.body.endDate.length == 0) {
      let dateNow = new Date(format(new Date(), "MM/dd/yyyy"));
      //let dateNow = new Date(restBody.startDate);
      let Day = dateNow.getDate() - 1;
      let Month = dateNow.getMonth() + 1;
      const Year = dateNow.getFullYear();
      startDate = new Date(Month + "-" + Day + "-" + Year);
      endDate = new Date(Month + "-" + Day + "-" + Year);
      endDate.setHours(23, 59, 59, 999);

      /**
       * Trường hợp nếu là ngày 1 đầu tháng..
       */

      if (Day === 0) {
        Month = dateNow.getMonth();
        startDate = new Date(Year, Month, 0);
        endDate = new Date(Year, Month, 0);
        endDate.setHours(23, 59, 59, 999);
      }
    }
    console.log("Ngày bắt đầu", startDate);
    console.log("Ngày kết thúc", endDate);

    /**
     * Gom nhóm những sản phẩm có chung organizationId,productTypeId,productFlowId, đếm số lượng nhóm
     */
    const findWithDate = await Product.aggregate()
      .match({
        $and: [
          { createdAt: { $gte: startDate } },
          { createdAt: { $lt: endDate } },
        ],
      })
      .group({
        _id: {
          organizationId: "$organizationId",
          productTypeId: "$productTypeId",
        },
        numberCreated: { $sum: 1 },
      });
    /**
     * Tạo một mảng object mới (newProducts) bao gồm organizationId,productTypeId,productFlowId ,numberCreated...
     */

    const newProducts = findWithDate.map((product) => ({
      ...product._id,
      numberCreated: product.numberCreated,
      startDate,
      endDate,
      createdBy,
    }));
    /**
     * Lấy ra tên của loại sản phẩm
     */
    const _dataName = await Statistic.populate(newProducts, {
      path: "productTypeId",
      select: "_id name",
      model: ProductType,
    });
    /**
     * Nếu Sản phẩm được gom nhóm = 0 (Chưa có sản phẩm nào được thêm trong ngày)
     */
    if (newProducts.length == 0) {
      return res.status(500).json({
        data: null,
        errors: [
          {
            message: "There are no products listed for the day!",
          },
        ],
      });
    }
    const findDate = await Statistic.find().where({
      $and: [{ startDate: startDate }, { endDate: endDate }],
    });
    /**
     * Nếu tìm được thống kê trong ngày (object >0) , Đã được thống kê..
     */

    if (findDate.length > 0) {
      return res.status(500).json({
        data: null,
        errors: [
          {
            message: "You did the statistics during that time!",
          },
        ],
      });
    } else {
      const result: string[] = [];

      for (let i = 0; i < newProducts.length; i++) {
        const _data = await Statistic.create({
          organizationId: newProducts[i].organizationId,
          productTypeId: newProducts[i].productTypeId,
          numberCreated: newProducts[i].numberCreated,
          productTypeName: newProducts[i].productTypeId,
          startDate: newProducts[i].startDate,
          endDate: newProducts[i].endDate,
          createdBy: newProducts[i].createdBy,
        });

        result.push(_data as any);
      }

      return res.status(200).json({
        data: result as any,
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

export default createStatistic;
