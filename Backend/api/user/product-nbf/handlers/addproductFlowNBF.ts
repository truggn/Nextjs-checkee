import dbConnect from "@/utils/dbConnect";
import ProductNBF from "@/models/ProductNBF";
import Product, { ProductDocument } from "@/models/Product";
import { ProductNBFflowHandler } from "../id";

const APIaddproductFlowNBF: ProductNBFflowHandler["addproductFlowNBF"] =
  async ({ req, res, body: { id: productFlowId, product: productIds } }) => {
    try {
      await dbConnect();

      const findProduct = await ProductNBF.find({ productId: productIds });
      if (findProduct.length > 0) {
        await Product.updateMany({ productFlowId }).where({ _id: productIds });

        await ProductNBF.deleteMany().where({ productId: productIds });

        const findUpdate = await Product.find({ _id: productIds });
        return res.status(200).json({
          data: findUpdate as any,
        });
      } else {
        return res.status(400).json({
          data: null,
          errors: [
            {
              message: "Cannot add product!",
            },
          ],
        });
      }
    } catch (error) {
      return res.status(500).json({
        data: null,
        errors: [{ message: error.message }],
      });
    }
  };

export default APIaddproductFlowNBF;
