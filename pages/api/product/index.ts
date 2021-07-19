import productAPI from 'Backend/api/product'


export const config = {
    api: {
        bodyParser: false,
    },
}

export default productAPI()