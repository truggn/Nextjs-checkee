import customersAPI from "@apiUser/customer/indexId";
import authentication from "@middlewares/authentication";

export default authentication(customersAPI());
