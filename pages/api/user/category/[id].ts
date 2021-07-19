import CategoryAPIById from "@apiUser/category/id";
import authentication from "@middlewares/authentication";

export default authentication(CategoryAPIById());
