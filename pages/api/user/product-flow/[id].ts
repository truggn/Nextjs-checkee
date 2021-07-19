import ProductFlowIdAPI from "@apiUser/product-flow/id";
import authentication from "@middlewares/authentication";

export default authentication(ProductFlowIdAPI());
