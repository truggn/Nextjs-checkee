import participantsAPI from "@apiUser/participants/getParticipantOfCustomer";
import authentication from "@middlewares/authentication";

export default authentication(participantsAPI());
