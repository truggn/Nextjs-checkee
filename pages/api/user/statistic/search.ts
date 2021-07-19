import StatisticAPI from "@apiUser/statistic/search";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
