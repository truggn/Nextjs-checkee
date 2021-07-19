import dbConnect from "@/utils/dbConnect";
import Review, { ReviewsDocument } from "@/models/Review";
import User, { UserDocument } from "@/models/User";
import ProductType, { ProductTypeDocument } from "@/models/ProductType";
import { ReviewHandlers } from "../index";

const createReviewProduct: ReviewHandlers["createReviewProduct"] = async ({
  req,
  res,
  body: {
    quality,
    worththemoney,
    effectiveuse,
    reuse,
    sharefriend,
    userId,
    comment,
    productTypeId,
    image,
  },
}) => {
  let result: { data?: ReviewsDocument[] } = { data: [] };
  try {
    await dbConnect();

    const Arr = [quality, worththemoney, effectiveuse, reuse, sharefriend];
    let reducerArr = Arr.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    //const total = Math.ceil(reducerArr / 5);
    const total = (reducerArr / Arr.length).toFixed(1);

    const data = {
      quality,
      worththemoney,
      effectiveuse,
      reuse,
      sharefriend,
      userId,
      comment,
      image,
      productTypeId,
      star: total,
    };
    /*kiểm tra xem người dùng đã đánh giá sản phẩm chưa*/
    const findReview = await Review.findOne({
      userId: req.body.userId,
      productTypeId: req.body.productTypeId,
    }).populate({
      path: "userId",
      select: "firstName lastName fullName",
      model: User,
    });
    if (findReview) {
      /*nếu người đùng đã đánh giá sản phẩm*/
      return res.status(200).json({
        data: findReview,
        errors: [{ message: "You rated!" }],
      });
    } else {
      /*thêm đánh giá cho sản phẩm*/
      const createReview = await Review.create(data);
      /*tìm tất cả đánh giá sản phẩm đó dựa trên id sản phẩm*/
      const findStar = await Review.find({
        productTypeId: req.body.productTypeId,
      });
      /* nếu sản phẩm chưa có đánh giá nào*/
      if (findStar.length == 0) {
        return res.status(400).json({
          data: null,
          errors: [{ message: "Product has no ratings yet!" }],
        });
      } else if (findStar) {
        /*tìm ra được 1 arr người đánh giá*/
        let sum = 0;
        for (let i = 0; i < findStar.length; i++) {
          sum = sum + findStar[i].star;
        }
        const x =
          sum /
          findStar.length; /*tính ra sao tổng cho tất cả người đánh giá sản phẩm đó*/
        const starMax = Math.round(x * 10) / 10;
        /*Cập nhật sao tổng cho sản phẩm*/
        await ProductType.findOneAndUpdate(
          { _id: req.body.productTypeId },
          { star: starMax },
          { new: true }
        );
        /*Lấy ra thông tin sản phẩm đã được đánh giá*/
        const find = await Review.findOne({
          productTypeId: req.body.productTypeId,
          userId: req.body.userId,
        })
          .populate({
            path: "userId",
            select: "firstName lastName fullName",
            model: User,
          })
          .populate({
            path: "productTypeId",
            select: "name",
            model: ProductType,
          });
        return res.status(200).json({
          data: find,
        });
      }
      if (!createReview) {
        return res.status(400).json({
          data: null,
          errors: [{ message: "Canot review!" }],
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};

export default createReviewProduct;
