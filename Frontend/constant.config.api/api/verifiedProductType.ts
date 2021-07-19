import axios from "axios";
import { PRODUCTTYPE } from "../index";

async function verifiedProductType(param) {
  let data;
  try {
    const res = await axios.put(PRODUCTTYPE + "/verified", param);
    data = res.data;
  } catch (error) {
    data = error;
  }
  return data;
}

export default verifiedProductType;
