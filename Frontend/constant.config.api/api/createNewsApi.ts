import axios from "axios";
import {NEWS} from "../index";
import {IListNews} from "../../redux/actions/NewsActions";

export default async function createNewsApi(values:IListNews) {
    let data;
    let param = {
        title: values.title,
        content: values.content,
        images: values.images,
        createdBy: values.createdBy,
    };
    await axios
    .post(NEWS, param)
    .then((res) => {
      data = res;
    })
    .catch((error) => {
      data = error;
    });
  return data;
}