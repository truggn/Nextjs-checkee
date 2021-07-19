import organizationIdApi from "Backend/api/organization/id";
import authentication from '@middlewares/authentication'


export default authentication(organizationIdApi())
