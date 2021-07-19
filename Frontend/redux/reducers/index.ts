import { combineReducers } from "redux";
import Employee from "./EmployeeReducer";
import SignUp from "./SignUpReducer";
import Login from "./LoginReducer";
import ListUser from "./ListUserReducer";
import Logout from "./LogoutReducer";
import SystemPage from "./SystemPageReducer";
import UserType from "./UserTypeReducer";
import ForgotPass from "./ForgotPassReducer";
import SystemUserTypePage from "./SystemUserTypePageReducer";
import Customer from "./CustomerReducer";
import AppendixContract from "./AppendixContractReducer";
import ManagementMenu from "./ManagementMenuReducer";
import ChangePass from "./ChangePassReducer";
import Participant from "./ParticipantReducer";
import Contract from "./ContractReducer";
import CreateProduct from "./CreateProductReducer";
import ProductType from "./ProductTypeReducer";
import SearchProduct from "./SearchProductReducer";
import ChangeMenu from "./ChangeMenuReducer";
import ProductAttributes from "./ProductAttributesReducer";
import SettingProcess from "./SettingProcessReducer";
import TypeParticipant from "./TypeParticipantReducer";
import UserManage from "./UserManageReducer";
import ProcessManage from "./ProcessManageReducer";
import ProcessOfProduct from "./ProcessOfProductReducer";
import NewsReducers from "./Newsreducers";
import RetrieveProductInformation from "./RetrieveProductInformationReducer";
import ProductTypeForProcess from "./ProductTypeForProcessReducer";
import ProductTypeWithoutProcess from "./ProductTypeWithoutProcessReducer";
import LightBoxReducers from "./LightBoxReducer";
import DashBoardReducers from "./DashBoardReducer";
import Category from "./CategoyReducer";
import CategoryProduct from "./CategoryProductReducer";
import selectedOrganization from "./SelectedOrganizationReducer";

//user
import ProductTypeUser from "./user/ProductTypeReducer";
import ProcessManageUser from "./user/ProcessManageReducer";
import ParticipantReducerUser from "./user/ParticipantReducer";
import CreateProductUser from "./user/CreateProductReducer";
const appReducer = combineReducers({
  Employee,
  SignUp,
  Login,
  ListUser,
  Logout,
  SystemPage,
  UserType,
  ForgotPass,
  SystemUserTypePage,
  Customer,
  AppendixContract,
  ChangePass,
  ManagementMenu,
  Participant,
  Contract,
  CreateProduct,
  ProductType,
  SearchProduct,
  ChangeMenu,
  ProductAttributes,
  SettingProcess,
  TypeParticipant,
  UserManage,
  ProcessManage,
  ProcessOfProduct,
  NewsReducers,
  RetrieveProductInformation,
  ProductTypeForProcess,
  ProductTypeWithoutProcess,
  LightBoxReducers,
  DashBoardReducers,
  CategoryProduct,
  Category,
  selectedOrganization,
  //user
  ProductTypeUser,
  ProcessManageUser,
  CreateProductUser,
  ParticipantReducerUser,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "LOGOUT") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
