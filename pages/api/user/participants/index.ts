import participantsAPI from "@apiUser/participants";
import authentication from "@middlewares/authentication";

export default authentication(participantsAPI());
