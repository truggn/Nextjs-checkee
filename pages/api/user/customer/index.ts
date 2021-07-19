import customersAPI from "@apiUser/customer";
import authentication from "@middlewares/authentication";

export default authentication(customersAPI());
