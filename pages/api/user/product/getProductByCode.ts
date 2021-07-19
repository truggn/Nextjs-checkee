import ProductAPI from "@apiUser/product/getProductByCode";
import authentication from "@middlewares/authentication";

export default authentication(ProductAPI());
