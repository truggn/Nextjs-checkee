import authentication from '@middlewares/authentication'
import categoryProductTypeAPI from '@apiUser/category-producttype'


export default authentication(categoryProductTypeAPI())