import axios from "axios";
import { PARTICIPANT} from "./../index";
import { IListParticipant} from "./../../redux/actions/ParticipantActions";
//
async function deleteParticipant(values: IListParticipant) {
  let data;
  let url = PARTICIPANT + "/" + values;
  await axios
    .delete(url)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}

export default deleteParticipant;
