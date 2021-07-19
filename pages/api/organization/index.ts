import organizationApi from "@api/organization";
import authentication from '@middlewares/authentication'


export default authentication(organizationApi())