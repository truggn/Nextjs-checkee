import authentication from "@middlewares/authentication";
import participantsIdAPI from "@apiUser/participants/id";

export default authentication(participantsIdAPI());
