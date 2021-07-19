import isAllowedMethod from "@/utils/is-allowed-method";
import { UserDocument } from "@/models/User";

import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import changePassword from "./handlers/changePassword";

export type ChangePasswordBody = {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
};

export type UsersHandlers = {
  changePassword: CheckeeHandler<null, ChangePasswordBody>;
};

const METHODS = ["POST"];

const changePasswordApi: CheckeeApiHandler<null, UsersHandlers> = async (
  req,
  res,
  // config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    const body = { ...req.body };
    return await handlers["changePassword"]({ req, res, /* config, */ body });
  } catch (error) {
    // const message =
    //     error instanceof CheckeeApiError
    //         ? 'An unexpected error ocurred with the Checkee API'
    //         : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

const handlers = { changePassword };

export default createApiHandler(changePasswordApi, handlers, {});
