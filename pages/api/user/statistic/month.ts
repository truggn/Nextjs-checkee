import StatisticAPI from "@apiUser/statistic/month";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
