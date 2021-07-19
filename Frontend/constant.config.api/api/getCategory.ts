import { CATEGORY } from "../index";
import axios from "axios";

async function loadCategory() {
  let data;
  try {
    const res = await axios.get(CATEGORY);
    data = res.data.data;
  } catch (error) {
    data = error;
  }
  return data;
}

export default loadCategory;
