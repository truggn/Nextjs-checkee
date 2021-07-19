import ReviewAPI from "@apiUser/review/index";
import authentication from "@middlewares/authentication";


export default authentication(ReviewAPI())
