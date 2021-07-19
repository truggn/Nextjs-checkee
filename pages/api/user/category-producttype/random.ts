import authentication from '@middlewares/authentication'
import ramdomProductByCategoryIDAPI from '@apiUser/category-producttype/random'


export default authentication(ramdomProductByCategoryIDAPI())