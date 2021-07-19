import StatisticAPI from "@apiUser/statistic/index";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
