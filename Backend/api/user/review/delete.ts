import isAllowedMethod from "@/utils/is-allowed-method";
import mongoose, { ObjectId } from "mongoose";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";

import Review, { ReviewsDocument } from "@/models/Review";
import deleteReviewProduct from "./handlers/deleteReviewProduct";

interface bodyDelete {
  userId: ObjectId;
  productTypeId: ObjectId;
  image: string[];
  comment: string;
}
export type ReviewHandlers = {
  deleteReviewProduct: CheckeeHandler<ReviewsDocument, bodyDelete>;
};

const METHODS = ["PUT"];

const ReviewByIdAPI: CheckeeApiHandler<ReviewsDocument, ReviewHandlers> =
  async (req, res, handlers) => {
    if (!isAllowedMethod(req, res, METHODS)) return;

    try {
      if (req.method === "PUT") {
        const body = { ...req.body, id: req.query.id };
        return await handlers["deleteReviewProduct"]({ req, res, body });
      }
    } catch (error) {
      res
        .status(500)
        .json({ data: null, errors: [{ message: error.message }] });
    }
  };

export const handlers = { deleteReviewProduct };
export default createApiHandler(ReviewByIdAPI, handlers, {});
