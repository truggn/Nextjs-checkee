import ProductAPI from "@apiUser/product/getProductByType";
import authentication from "@middlewares/authentication";

export default authentication(ProductAPI());
