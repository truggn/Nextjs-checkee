import axios from "axios";

import { RETRIEVEPRODUCTINFORMATION } from "../index";
import { IProduct } from "../../redux/actions/RetrieveProductInformationActions";

export default async function retrieveInformation(value: IProduct) {
  let data;
  try {
    data = await axios.get(
      RETRIEVEPRODUCTINFORMATION +
        "/" +
        "retrieveInformation" +
        `?code=${value}`
    );
  } catch (error) {
    data = error;
  }
  return data;
}
