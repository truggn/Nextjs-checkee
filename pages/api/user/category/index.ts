import categoryAPI from "@apiUser/category";
import authentication from "@middlewares/authentication";

export default authentication(categoryAPI());
