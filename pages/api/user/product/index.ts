import productAPI from "@apiUser/product";

export const config = {
  api: {
    bodyParser: false,
  },
};
import authentication from "@middlewares/authentication";

export default authentication(productAPI());
