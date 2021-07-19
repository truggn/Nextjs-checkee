import ProductFlowsAPI from "@apiUser/product-flow/getProductFlowOfProductType";
import authentication from "@middlewares/authentication";

export default authentication(ProductFlowsAPI());
