import axios from "axios";
import { CATEGORY } from "../index";
async function loadAllCate() {
  let data;
  try {
    const res = await axios.get(CATEGORY + `/detail-all`);
    data = res;
  } catch (error) {
    data = error;
  }
  return data;
}

export default loadAllCate;
