import categoryLevel1API from "@apiUser/category/index_level1";
import authentication from "@middlewares/authentication";

export default authentication(categoryLevel1API());
