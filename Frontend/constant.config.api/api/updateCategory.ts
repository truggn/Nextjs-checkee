import { CATEGORY } from "../index";
import axios from "axios";
import { IUpdateCategory } from "../../redux/actions/CategoryActions";

async function loadCategory(params: IUpdateCategory) {
  let data;
  const body = {
    id: params.id,
    name: params.name,
    description: params.description,
    updatedBy: params.updatedBy,
    icon: params.icon,
    indexHomeCategory: params.indexHomeCategory,
    isHomeCategory: params.isHomeCategory,
  };
  try {
    const res = await axios.put(CATEGORY, body);
    data = res;
  } catch (error) {
    data = error.response;
  }
  return data;
}

export default loadCategory;
