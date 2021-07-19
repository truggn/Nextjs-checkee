import ReviewByIdAPI from "@apiUser/review/delete";
import authentication from "@middlewares/authentication";


export default authentication(ReviewByIdAPI())
