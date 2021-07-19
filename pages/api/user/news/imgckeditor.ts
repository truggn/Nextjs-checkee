import ImageCkeditor from "@apiUser/news/imgckeditor";
export const config = {
  api: {
    bodyParser: false,
  },
};
import authentication from "@middlewares/authentication";

export default authentication(ImageCkeditor());
