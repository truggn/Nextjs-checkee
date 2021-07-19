import productAttributesIdAPI from "@apiUser/productattributes/id";
import authentication from "@middlewares/authentication";


export default authentication(productAttributesIdAPI())
