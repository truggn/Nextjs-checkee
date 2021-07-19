import { all, fork } from "redux-saga/effects";
import Employee from "./EmployeeSaga";
import SignUp from "./SignUpSaga";
import Login from "./LoginSaga";
import ListUser from "./ListUserSaga";
import Logout from "./LogoutSaga";
import Customer from "./CustomerSaga";
import AppendixContract from "./AppendixContractSaga";
import SystemPage from "./SystemPageSaga";
import UserType from "./UserTypeSaga";
import ForgotPass from "./ForgotPassSaga";
import SystemUserTypePage from "./SystemUserTypePageSaga";
import ChangePass from "./ChangePassSaga";
import ManagementMenu from "./ManagementMenuSaga";
import Participant from "./ParticipantSaga";
import Contract from "./ContractSaga";
import CreateProduct from "./CreateProductSaga";
import ProductType from "./ProductTypeSaga";
import SearchProduct from "./SearchProductSaga";
import ProductAttributes from "./ProductAttributesSaga";
import TypeParticipant from "./TypeParticipantSaga";
import UserManage from "./UserManageSaga";
import SettingProcess from "./SettingProcessSaga";
import ProcessManage from "./ProcessManageSaga";
import ProcessOfProduct from "./ProcessOfProductSaga";
import ListNewsSaga from "./NewsSaga";
import ProductTypeForProcess from "./ProductTypeForProcessSaga";
import ProductTypeWihtoutProcess from "./ProductTypeWithoutProcessSaga";
import RetrieveProductInformation from "./RetrieveProductInformationSaga";
import DashBoard from "./DashBoardSaga";
import CategoryProduct from "./CategoryProductSaga";

import Category from "./CategorySaga";
import ParticipantUserSaga from "./user/ParticipantSaga";

//user
import ProductTypeUser from "./user/ProductTypeSaga";
import ProcessManageUser from "./user/ProcessManageSaga";
import CreateProductUser from "./user/CreateProductSaga";

export default function* rootSaga() {
  yield all([
    ...Employee,
    ...SignUp,
    ...Login,
    ...ListUser,
    ...Logout,
    ...Customer,
    ...AppendixContract,
    ...SystemPage,
    ...UserType,
    ...ForgotPass,
    ...SystemUserTypePage,
    ...ChangePass,
    ...ManagementMenu,
    ...Participant,
    ...Contract,
    ...CreateProduct,
    ...ProductType,
    ...SearchProduct,
    ...ProductAttributes,
    ...TypeParticipant,
    ...UserManage,
    ...ProcessManage,
    ...SettingProcess,
    ...ProcessOfProduct,
    ...ListNewsSaga,
    ...ProductTypeForProcess,
    ...ProductTypeWihtoutProcess,
    ...RetrieveProductInformation,
    ...DashBoard,
    ...Category,
    ...CategoryProduct,
    ...ProductTypeUser,
    ...ProcessManageUser,
    ...ParticipantUserSaga,
    ...CreateProductUser,
  ]);
}
