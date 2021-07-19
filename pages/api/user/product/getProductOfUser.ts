import ProductAPI from "@apiUser/product/getProductOfUser";
import authentication from "@middlewares/authentication";

export default authentication(ProductAPI());
