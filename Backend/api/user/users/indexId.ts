import isAllowedMethod from "@/utils/is-allowed-method";
import { UserDocument } from "@/models/User";
import createApiHandler, {
  CheckeeApiHandler,
  CheckeeHandler,
} from "@/utils/create-api-handler";
import getUserById from "./handlers/getUserById";
import deleteUser from "./handlers/deleteUser";
export type UsersHandlers = {
  getUserById: CheckeeHandler<UserDocument>;
  deleteUser: CheckeeHandler<UserDocument>;
};

const METHODS = ["POST", "GET", "DELETE"];

const usersAPI: CheckeeApiHandler<UserDocument, UsersHandlers> = async (
  req,
  res,
  // config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return;

  try {
    if (req.method === "GET") {
      const body = null;
      return await handlers["getUserById"]({ req, res, body });
    }
    if (req.method === "DELETE") {
      const body = null;
      return await handlers["deleteUser"]({ req, res, body });
    }
  } catch (error) {
    console.error(error);

    res.status(500).json({ data: null, errors: [{ message: error.message }] });
  }
};

export const handlers = { getUserById, deleteUser };

export default createApiHandler(usersAPI, handlers, {});
