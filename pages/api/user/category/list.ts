import ListCategoryAPI from "@apiUser/category/list_data";
import authentication from "@middlewares/authentication";

export default authentication(ListCategoryAPI());
