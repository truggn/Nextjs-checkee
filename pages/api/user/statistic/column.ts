import StatisticAPI from "@apiUser/statistic/column";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
