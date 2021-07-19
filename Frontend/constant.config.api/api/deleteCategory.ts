import axios from "axios";
import { IDeleteCategory } from "../../redux/actions/CategoryActions";
import { CATEGORY } from "../index";

async function deleteCategory(param: IDeleteCategory) {
  let data;
  const body = {
    deletedBy: param.userId,
  };
  try {
    const res = await axios.put(CATEGORY + `/${param.id}`, body);
    data = res.data;
  } catch (error) {
    data = error;
  }
  return data;
}

export default deleteCategory;
