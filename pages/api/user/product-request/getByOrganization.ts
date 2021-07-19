import ProductRequestByOrganizationApi from "@apiUser/product-request/getByOrganization"
import authentication from "@middlewares/authentication"



export default authentication(ProductRequestByOrganizationApi())