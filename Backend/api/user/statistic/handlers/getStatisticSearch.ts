import dbConnect from "@/utils/dbConnect";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import Organization, { OrganizationDocument } from "@/models/Organization";
import { StatisticHandlers } from "../search";
import mongoose from "mongoose";
const getStatisticSearch: StatisticHandlers["getStatisticSearch"] = async ({
  req,
  res,
  body: { ...resbody },
}) => {
  try {
    await dbConnect();

    const startDate = new Date(resbody.startDate);
    const endDate = new Date(resbody.endDate);
    const id = mongoose.Types.ObjectId(resbody.id);
    endDate.setHours(23, 59, 59, 999);

    /**
     * Gr những loại sản phẩm của 1 đối tác
     */
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
          productTypeId: "$productTypeId",
        },
        numberCreated: { $sum: "$numberCreated" },
        productTypeName: { $addToSet: "$productTypeName" },
        createdAt: { $addToSet: "$createdAt" },
      });

    /**
     * Tạo một mảng object mới (newProducts) bao gồm ,productTypeName ,numberCreated...
     */
    const newProducts = findWithDate.map((product) => ({
      productTypeName: product.productTypeName[0],
      numberCreated: product.numberCreated,
      createdAt: product.createdAt[0],
    }));

    const searchs = await newProducts.filter((song) => {
      return (
        song.productTypeName.name
          .toLowerCase()
          .indexOf(resbody.search.toLowerCase()) !== -1
      );
    });

    /**
     * Nếu Sản phẩm được gom nhóm = 0 (Chưa có thống kê trong tháng)
     */
    if (newProducts.length == 0 || searchs.length == 0) {
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
      data: searchs as any,
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

export default getStatisticSearch;
