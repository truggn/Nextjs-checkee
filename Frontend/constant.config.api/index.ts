export const SERVERAPI = "http://localhost:3000/";
// export const SERVERAPI = "https://checkee.vercel.app/";
// export const SERVERAPI = "https://checkee-dev.vercel.app/";

const EMPLOYEE = SERVERAPI + "api/employees";
const SIGNUP = SERVERAPI + "api/users";
const LOGIN = SERVERAPI + "api/users/login";
const LOGOUT = SERVERAPI + "api/users/logout";
const CONTRACT = SERVERAPI + "api/contract";
const APPENDIXCONTRACT = SERVERAPI + "api/appendixcontract";
const CUSTOMER = SERVERAPI + "api/customer";
const GETUSERLOGIN = SERVERAPI + "api/users/get-logged-in-user";
const DELETEDUSER = SERVERAPI + "api/users";
const CREATEUSER = SERVERAPI + "api/users";
const LISTUSER = SERVERAPI + "api/users";
const UPDATEUSER = SERVERAPI + "api/users";
const SYSTEMPAGE = SERVERAPI + "api/systempage";
const USERTYPE = SERVERAPI + "api/usertype";
const FORGOTPASS = SERVERAPI + "api/users/recovery";
const SYSTEMUSERTYPEPAGE = SERVERAPI + "api/systemusertypepage";
const MANAGEMENTMENU = SERVERAPI + "api/systempagemenu";
const CHECKACCESSRIGHT = SERVERAPI + "api/systemusertypepage/aceess-right";
const CHANGEPASSWORD = SERVERAPI + "api/users/change-password";
const CHANGEFORGOTPASSWORD = SERVERAPI + "api/users/reset-password";
const PARTICIPANT = SERVERAPI + "api/participants";
const CREATEPRODUCT = SERVERAPI + "api/uploadfile";
const CREATE_PRODUCT_REPAIR = SERVERAPI + "api/product-request";
const PRODUCTTYPE = SERVERAPI + "api/producttype";
const CONFIRMPRODUCT = SERVERAPI + "api/uploadfile/changestatus";
const SEARCHPRODUCT = SERVERAPI + "api/product/getProductByCode";
const PRODUCTATTRIBUTES = SERVERAPI + "api/productattributes";
const TYPEPARTICIPANT = SERVERAPI + "api/participant-types";
const USERMANAGE = SERVERAPI + "api/organization-members";
const PROCESSMANAGE = SERVERAPI + "api/product-flow";
const SETTINGPROCESSOFPRODUCT =
  SERVERAPI + "api/participants/getParticipantOfCustomer";
const SETTINGPROCESSCOLUMN = SERVERAPI + "api/flow";
const GETADDITIONALINFORMATION =
  SERVERAPI + "api/productattributes/getProductAttributesOfProductType";
const CREATESETTINGPARTICIPANT = SERVERAPI + "api/setting/flow";
const SETTINGPROCESSPROPS = SERVERAPI + "api/setting/attributes";
const PRODUCTFLOW = SERVERAPI + "api/setting/productflow";
const CREATESETTINGPROCESSPROPS = SERVERAPI + "api/setting/attribute";

const NEWS = SERVERAPI + "api/news";

const RETRIEVEPRODUCTINFORMATION = SERVERAPI + "api/product";
const PROCESSOFPRODUCT = SERVERAPI + "api/updateproductinformation";
const DATAPRODUCTFORPROCESS = SERVERAPI + "api/product-nbf";

const REVIEWPRODUCT = SERVERAPI + "api/review";
const STATIC = SERVERAPI + "api/statistic/id";
const STATICCL = SERVERAPI + "api/statistic/column";
const STATICM = SERVERAPI + "api/statistic/month";
const CATEGORY = SERVERAPI + "api/category";
const PRODUCTREQUEST = SERVERAPI + "api/product-request";
const STATICD = SERVERAPI + "api/statistic/day";
const STATICALL = SERVERAPI + "api/statistic/total";
const LISTOFPRODUCT = SERVERAPI + "api/category-producttype";

const PARTICIPANTUSER = SERVERAPI + "api/participants/getParticipantOfCustomer";
// user
const PRODUCTTYPEUSER = SERVERAPI + "api/user/producttype";
const PROCESSMANAGEUSER = SERVERAPI + "api/user/product-flow";
const CREATE_PRODUCTUSER_REPAIR = SERVERAPI + "api/user/product-request";
//export
export {
  EMPLOYEE,
  SIGNUP,
  LOGIN,
  LOGOUT,
  CUSTOMER,
  CONTRACT,
  APPENDIXCONTRACT,
  GETUSERLOGIN,
  DELETEDUSER,
  CREATEUSER,
  LISTUSER,
  UPDATEUSER,
  SYSTEMPAGE,
  USERTYPE,
  FORGOTPASS,
  SYSTEMUSERTYPEPAGE,
  CHANGEPASSWORD,
  MANAGEMENTMENU,
  CHECKACCESSRIGHT,
  CHANGEFORGOTPASSWORD,
  PARTICIPANT,
  CREATEPRODUCT,
  CREATE_PRODUCT_REPAIR,
  CONFIRMPRODUCT,
  PRODUCTTYPE,
  SEARCHPRODUCT,
  PRODUCTATTRIBUTES,
  TYPEPARTICIPANT,
  USERMANAGE,
  PROCESSMANAGE,
  SETTINGPROCESSOFPRODUCT,
  SETTINGPROCESSCOLUMN,
  GETADDITIONALINFORMATION,
  CREATESETTINGPARTICIPANT,
  SETTINGPROCESSPROPS,
  CREATESETTINGPROCESSPROPS,
  PRODUCTFLOW,
  NEWS,
  RETRIEVEPRODUCTINFORMATION,
  PROCESSOFPRODUCT,
  DATAPRODUCTFORPROCESS,
  REVIEWPRODUCT,
  STATIC,
  STATICCL,
  STATICM,
  CATEGORY,
  PRODUCTREQUEST,
  STATICD,
  STATICALL,
  LISTOFPRODUCT,
  PARTICIPANTUSER,
  //user
  PRODUCTTYPEUSER,
  PROCESSMANAGEUSER,
  CREATE_PRODUCTUSER_REPAIR,
};
