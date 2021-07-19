import axios from "axios";
import { TYPEPARTICIPANT } from "./../index";
//
async function getTypeParticipant() {
  let data;
  await axios
    .get(TYPEPARTICIPANT)
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getTypeParticipant;
