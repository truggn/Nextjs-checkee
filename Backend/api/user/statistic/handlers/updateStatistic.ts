import dbConnect from "@/utils/dbConnect";
import Product, { ProductDocument } from "@/models/Product";
import ProductType, { ProductTypeDocument } from "@/models/ProductType";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../index";
import _ from "lodash";
const updateStatistic: StatisticHandlers["updateStatistic"] = async ({
  req,
  res,
  body: { updatedBy, ...restBody },
}) => {
  try {
    await dbConnect();
    const startDate = new Date(restBody.startDate);
    const endDate = new Date(restBody.endDate);
    endDate.setHours(23, 59, 59, 999);
    /**
     * Gom nhóm những sản phẩm có chung organizationId,productTypeId,productFlowId, điếm số lượng nhóm
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
      updatedBy,
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
    /**
     * Tìm thống kê
     */
    const findDate = await Statistic.find()
      .where({
        $and: [
          { startDate: startDate },
          { endDate: endDate },
          { isDeleted: false },
        ],
      })
      .select(
        "organizationId productTypeId numberCreated numberCreated startDate endDate updatedBy _id"
      )
      .populate({
        path: "productTypeId",
        select: "_id name",
        model: ProductType,
      });

    /**
     * Nếu chưa có thống kê (Arr = 0), insert newProducts vào Statistic
     */
    if (findDate.length == 0) {
      for (let i = 0; i < newProducts.length; i++) {
        await Statistic.create({
          organizationId: newProducts[i].organizationId,
          productTypeId: newProducts[i].productTypeId._id,
          numberCreated: newProducts[i].numberCreated,
          productTypeName: _dataName[i].productTypeId,
          startDate: newProducts[i].startDate,
          endDate: newProducts[i].endDate,
          updatedBy: newProducts[i].updatedBy,
          createdBy: newProducts[i].updatedBy,
        });
      }
      const findUpdate1 = await Statistic.find().where({
        $and: [
          { startDate: startDate },
          { endDate: endDate },
          { isDeleted: false },
        ],
      });
      return res.status(200).json({
        data: findUpdate1,
      });
    }

    /**
     * Nếu tìm được thống kê trong ngày (object > 0) , update lại numberCreated và thêm thống kê nếu có
     */

    if (findDate.length > 0) {
      /**
       * thêm sản phẩm mới trong ngày vào thống kê
       */
      if (newProducts.length > findDate.length) {
        const dataFilter = await _.differenceWith(
          newProducts,
          findDate,
          (iteamA, itemB) =>
            String(iteamA.productTypeId) === String(itemB.productTypeId)
        );
        for (let i = 0; i < dataFilter.length; i++) {
          await Statistic.create({
            organizationId: dataFilter[i].organizationId,
            productTypeId: dataFilter[i].productTypeId,
            numberCreated: newProducts[i].numberCreated,
            productTypeName: newProducts[i].productTypeId,
            startDate: newProducts[i].startDate,
            endDate: newProducts[i].endDate,
            updatedBy: newProducts[i].updatedBy,
            createdBy: newProducts[i].updatedBy,
          });
        }
      }
      /**
       *Tìm thống kê sao khi được thêm và update lại
       */
      const findCreate = await Statistic.find().where({
        $and: [
          { startDate: startDate },
          { endDate: endDate },
          { isDeleted: false },
        ],
      });
      for (let i = 0; i < findCreate.length; i++) {
        await Statistic.updateMany(
          {
            _id: findCreate[i]._id,
          },
          {
            organizationId: newProducts[i].organizationId,
            productTypeId: newProducts[i].productTypeId._id,
            numberCreated: newProducts[i].numberCreated,
            productTypeName: _dataName[i].productTypeId,
            startDate: newProducts[i].startDate,
            endDate: newProducts[i].endDate,
            updatedBy: newProducts[i].updatedBy,
          },
          { new: true }
        );
      }

      /**
       * Tìm lại thống kê đã update trả về
       */
      const findUpdate2 = await Statistic.find().where({
        $and: [
          { startDate: startDate },
          { endDate: endDate },
          { isDeleted: false },
        ],
      });
      return res.status(200).json({
        data: findUpdate2,
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

export default updateStatistic;
