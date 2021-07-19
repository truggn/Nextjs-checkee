import StatisticAPI from "@apiUser/statistic/id";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
