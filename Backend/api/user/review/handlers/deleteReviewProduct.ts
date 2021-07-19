import dbConnect from "@/utils/dbConnect";
import Review, { ReviewsDocument } from "@/models/Review";
import User, { UserDocument } from "@/models/User";
import ProductType, { ProductTypeDocument } from "@/models/ProductType";
import { ReviewHandlers } from "../delete";

const deleteReviewProduct: ReviewHandlers["deleteReviewProduct"] = async ({
  req,
  res,
  body: { ...resBody },
}) => {
  try {
    await dbConnect();

    const _data = await Review.findOne({ userId: resBody.userId }).where({
      productTypeId: resBody.productTypeId,
    });

    if (_data) {
      const result = await Review.updateOne(
        { _id: _data._id },
        { $unset: { image: "", comment: "" } },
        { new: true }
      );

      if (result) {
        const _dataUpdate = await Review.findOne({
          userId: resBody.userId,
        }).where({
          productTypeId: resBody.productTypeId,
        });
        return res.status(200).json({
          data: _dataUpdate,
          errors: [{ message: "successful delete!" }],
        });
      }
    }

    if (!_data) {
      return res.status(400).json({
        data: null,
        errors: [{ message: "Canot Delete!" }],
      });
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};

export default deleteReviewProduct;
