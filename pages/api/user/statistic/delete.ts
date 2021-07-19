import StatisticAPI from "@apiUser/statistic/delete";
import authentication from "@middlewares/authentication";


export default authentication(StatisticAPI())
