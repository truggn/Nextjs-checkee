import axios from "axios";
import { PARTICIPANTUSER  } from "./../../index";
//
async function getParticipant(organizationId) {
  let data;
  await axios
    .get(PARTICIPANTUSER ,{params:organizationId})
    .then((res) => {
      data = res;
    })
    .catch((err) => {
      data = err;
    });
  return data;
}

export default getParticipant;
