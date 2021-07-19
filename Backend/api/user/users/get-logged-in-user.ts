import isAllowedMethod from "@/utils/is-allowed-method";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import { UserDocument } from "@/models/User";
import getLoggedInUser from "./handlers/get-logged-in-user";

export type UserData = {
  user: UserDocument;
};

export type LoggedInUserHandlers = {
  getLoggedInUser: CheckeeHandler<UserData>;
};

const METHOD = ["GET"];

const userApi: CheckeeApiHandler<UserData, LoggedInUserHandlers> = async (
  req,
  res,
  // config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHOD)) return;

  try {
    const body = null;
    return await handlers["getLoggedInUser"]({ req, res, body });
  } catch (error) {
    // const message =
    //     error instanceof CheckeeApiError
    //         ? 'An unexpected error ocurred with the Checkee API'
    //         : 'An unexpected error ocurred'

    return res.status(500).json({
      data: null,
      errors: [{ message: error.message }],
    });
  }
};

const handler = { getLoggedInUser };

export default createApiHandler(userApi, handler, {});
