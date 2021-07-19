import NewsAPI from "@apiUser/news";
import authentication from "@middlewares/authentication";

export default authentication(NewsAPI());
