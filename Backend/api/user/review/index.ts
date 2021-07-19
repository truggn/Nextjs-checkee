import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import createReviewProduct from "./handlers/createReviewProduct";
import createReviewBase64Product from "./handlers/createReviewBase64Product";
import Review, { ReviewsDocument } from "@/models/Review";
import { ProductTypeDocument } from "@/models/ProductType";

interface bodyReview {
  quality: number;
  worththemoney: number;
  effectiveuse: number;
  reuse: number;
  sharefriend: number;
  userId: string;
  comment: string;
  image: string[];
  productTypeId: string;
  star: number;
}
export type ReviewHandlers = {
  createReviewProduct: CheckeeHandler<
    ReviewsDocument[] | ReviewsDocument,
    bodyReview
  >;
  createReviewBase64Product: CheckeeHandler<
    ReviewsDocument[] | ReviewsDocument,
    bodyReview
  >;
};

const METHODS = ["POST", "GET", "PUT", "DELETE"];

const ReviewAPI: CheckeeApiHandler<
  ReviewsDocument[] | ReviewsDocument | ProductTypeDocument,
  ReviewHandlers
> = async (req, res, handlers) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    /* create Base64 vào DB */
    // if (req.method === 'POST') {
    //     const body = {...req.body, id: req.query.id};
    //     return await handlers['createReviewProduct']({ req, res, body })
    // }
    /* Nhận vào Base64 lưu ảnh vào icloud */
    if (req.method === "POST") {
      const body = { ...req.body, id: req.query.id };
      return await handlers["createReviewBase64Product"]({ req, res, body });
    }
  } catch (error) {
    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { createReviewProduct, createReviewBase64Product };

export default createApiHandler(ReviewAPI, handlers, {});
