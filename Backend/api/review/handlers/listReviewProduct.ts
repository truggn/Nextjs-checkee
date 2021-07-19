import dbConnect from "@/utils/dbConnect";
import type { GetListReviewstHandlers } from "../list";
import Review from "@/models/Review";
import User from "@/models/User";

const getListReviews: GetListReviewstHandlers["listReviewProduct"] = async ({
  res,
  req,
  body,
}) => {
  try {
    await dbConnect();
    const _listReview = await Review.find({
      productTypeId: req.query.id,
    })
      .populate({
        path: "userId",
        select: "firstName lastName fullName",
        model: User,
      })
      .sort({
        createdAt: "desc",
      });
    return res.status(200).json({
      data: _listReview,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};

export default getListReviews;
