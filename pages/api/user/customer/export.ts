import exportCustomer from "@apiUser/customer/export";
import authentication from "@middlewares/authentication";

export default authentication(exportCustomer());
