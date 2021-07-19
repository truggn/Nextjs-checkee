import NewsAPIById from "@apiUser/news/id";
import authentication from "@middlewares/authentication";

export default authentication(NewsAPIById());
