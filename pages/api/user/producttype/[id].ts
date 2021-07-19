import productTypeIdAPI from "@apiUser/producttype/id";
import authentication from "@middlewares/authentication";


export default authentication(productTypeIdAPI())