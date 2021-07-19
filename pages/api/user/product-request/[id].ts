import ProductRequestIdApi from "@apiUser/product-request/id"
import authentication from "@middlewares/authentication"



export default authentication(ProductRequestIdApi())