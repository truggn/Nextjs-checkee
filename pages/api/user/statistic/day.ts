import StatisticAPI from "@apiUser/statistic/day";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
