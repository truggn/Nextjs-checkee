import isAllowedMethod from "@/utils/is-allowed-method";
import { UserDocument } from "@/models/User";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import logout from "./handlers/logout";

export type UserToken = {
  user: UserDocument;
  token: string;
};

export type LogoutHandlers = {
  logout: CheckeeHandler<null, { redirectTo?: string }>;
};

const METHODS = ["POST"];

const logoutApi: CheckeeApiHandler<null, LogoutHandlers> = async (
  req,
  res,
  // config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return;
  // const { cookies } = req
  // const token = cookies['user-token']

  try {
    const redirectTo = 1 || req.query.redirect_to;
    const body = typeof redirectTo === "string" ? { redirectTo } : {};

    // const body = { ...req.body, token }
    return await handlers["logout"]({ req, res, /* config, */ body });
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { logout };

export default createApiHandler(logoutApi, handlers, {});
