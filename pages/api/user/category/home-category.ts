import HomeCategoryAPI from "@apiUser/category/isHomeCategory";
import authentication from "@middlewares/authentication";

export default authentication(HomeCategoryAPI());
