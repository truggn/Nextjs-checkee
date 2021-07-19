import DetailProductType from "@apiUser/producttype/verified";
import authentication from "@middlewares/authentication";


export default authentication(DetailProductType())
