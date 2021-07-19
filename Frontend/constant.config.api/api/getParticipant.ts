import axios from "axios";
import { PARTICIPANT } from "./../index";
//
async function getParticipant() {
  let data;
  await axios
    .get(PARTICIPANT)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getParticipant;
