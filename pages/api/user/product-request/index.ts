import ProductRequestApi from "@apiUser/product-request"
import authentication from "@middlewares/authentication"




export default authentication(ProductRequestApi())