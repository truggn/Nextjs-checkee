import dbConnect from "@/utils/dbConnect";
import Statistic, { StatisticDocument } from "@/models/Statistic";
import { StatisticHandlers } from "../delete";

const deleteStatistic: StatisticHandlers["deleteStatistic"] = async ({
  req,
  res,
  body: { deletedBy, ...restBody },
}) => {
  try {
    await dbConnect();
    const startDate = new Date(restBody.startDate);
    const endDate = new Date(restBody.endDate);
    endDate.setHours(23, 59, 59, 999);

    /**
     * Tìm thống kê theo ngày
     */
    const findData = await Statistic.find().where({
      $and: [{ startDate: startDate }, { endDate: endDate }],
    });
    /**
     * Nếu không có thống kê trong ngày
     */
    if (findData.length == 0) {
      return res.status(500).json({
        data: null,
        errors: [
          {
            message: "No statistics!",
          },
        ],
      });
    }
    /**
     * Nếu không có thống kê , xóa thống kê (update trường isDeleted)
     */
    if (findData.length > 0) {
      for (let i = 0; i < findData.length; i++) {
        const deleteStatistic = await Statistic.updateMany(
          {
            _id: findData[i]._id,
          },
          {
            isDeleted: true,
            deletedBy: deletedBy,
          },
          { new: true }
        );
        if (!deleteStatistic) {
          return res.status(400).json({
            data: null,
            errors: [
              {
                message: "Delete statistics failed!.",
              },
            ],
          });
        }
      }
      return res.status(200).json({
        data: null,
        errors: [
          {
            message: "Delete statistics successfully",
          },
        ],
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

export default deleteStatistic;
