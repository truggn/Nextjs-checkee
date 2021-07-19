import productNBFAPI from "@apiUser/product-nbf/index";
import authentication from "@middlewares/authentication";

export default authentication(productNBFAPI());
