import DetailProductType from "@apiUser/producttype/detail";
import authentication from "@middlewares/authentication";


export default authentication(DetailProductType())
