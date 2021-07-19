import StatisticAPI from "@apiUser/statistic/total";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
