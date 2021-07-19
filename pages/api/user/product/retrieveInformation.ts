import RetrieveProductInformationAPI from "@apiUser/product/retrieveProductInformation";
import authentication from "@middlewares/authentication";

export default authentication(RetrieveProductInformationAPI());
