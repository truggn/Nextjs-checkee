import dbConnect from "@/utils/dbConnect";
import ProductNBF from "@/models/ProductNBF";
import Product, { ProductDocument } from "@/models/Product";
import { ProductNBFflowHandler } from "../id";

const removeProductFlowNBF: ProductNBFflowHandler["removeProductFlowNBF"] =
  async ({ req, res, body: { ...resBody } }) => {
    try {
      await dbConnect();
      const find = await Product.find({
        productFlowId: resBody.productFlowId,
      });
      if (find) {
        for (let i = 0; i < resBody.product.length; i++) {
          await Product.findOneAndUpdate(
            { _id: resBody.product[i] },
            { $unset: { productFlowId: "" } },
            { new: true }
          );

          const findProduct = await Product.find({
            _id: resBody.product[i],
          }).then((items) => items[0]);

          await ProductNBF.create({
            organizationId: findProduct.organizationId,
            productTypeId: findProduct.productTypeId,
            name: findProduct.name,
            code: findProduct.code,
            productId: findProduct._id,
          });
        }
      }
      const findUpdate = await Product.find({
        productFlowId: resBody.productFlowId,
      });

      return res.status(200).json({
        data: findUpdate as any,
      });
    } catch (error) {
      return res.status(500).json({
        data: null,
        errors: [{ message: error.message }],
      });
    }
  };

export default removeProductFlowNBF;
