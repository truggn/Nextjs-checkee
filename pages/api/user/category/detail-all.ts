import DetailAllCategoryAPI from "@apiUser/category/detail_all";
import authentication from "@middlewares/authentication";

export default authentication(DetailAllCategoryAPI());
