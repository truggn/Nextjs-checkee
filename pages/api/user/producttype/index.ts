import ProductTypeApi from "@apiUser/producttype/index";
import authentication from '@middlewares/authentication';

export default authentication(ProductTypeApi());
