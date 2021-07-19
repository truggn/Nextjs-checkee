import axios from "axios";
import {NEWS} from "../index";
import {IListNewsUpdate} from "../../redux/actions/NewsActions";

export default async function updateNewsApi(values:IListNewsUpdate){
    let data; 
    let dataUpdate = {
        title: values.title,
        content: values.content,
        images: values.images,
        updatedBy: values.updatedBy,
        id: values.id,
    };

    console.log(dataUpdate);
    await axios.put(NEWS, dataUpdate)
      .then(res => {
        data = res;
      })
      .catch(err => {
        data = err
      })
  
    return data;
}