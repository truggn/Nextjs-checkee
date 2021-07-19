import { CATEGORY } from "../index";
import { ICategory } from "../../redux/actions/CategoryActions";
import axios from "axios";
async function addCategory(params: ICategory) {
  let data;
  try {
    const res = await axios.post(CATEGORY, params);
    data = res.data;
  } catch (error) {
    data = error;
  }
  return data;
}

export default addCategory;
