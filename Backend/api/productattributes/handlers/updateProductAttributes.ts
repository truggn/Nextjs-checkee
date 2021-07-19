import dbConnect from '@/utils/dbConnect';
import type { ProductAttributesHandlers } from '..';
import ProductAttributes, { ProductAttributesDocument} from '@/models/ProductAttributes';

//
const updateProductAttributes: ProductAttributesHandlers['updateProductAttributes'] = async ({
  res,
  req,
  body,
  // config,
}) => {
    let result: { data: ProductAttributesDocument[] } = { data: [] }

    try {

        await dbConnect()

        const id = req.body.id;

        const update = req.body.update;

        if (!id) {
            return res.status(400).json({
                data: null,
                errors: [{message: 'id không xác định'}],
            });
        } 

        if (update.productTypeId || update.productTypeId === '' || update.productTypeId === null) {
            return res.status(400).json({
                data: null,
                errors: [{message: 'Không cho phép cập nhật productTypeId'}],
            });
        }
    
        if (update.organizationId || update.organizationId === '' || update.organizationId === null) {
            return res.status(400).json({
                data: null,
                errors: [{message: 'Không cho phép cập nhật organizationId'}],
            });
        }

        const _user = await ProductAttributes.findOneAndUpdate({
            _id: id,
        }, update, {new: true});
        

        if (!_user) {
            return res.status(400).json({
                data: null,
                errors: [{message: 'ProductAttributes không tồn tại'}],
            });
        } 

        result.data[0] = _user;
 
    } catch (error) {
        return res.status(400).json({
        data: null,
        errors: [{message: error.message}],
        });
    }
    
    return res.status(200).json({
        data: result.data,
        errors: [{message: 'Cập nhật thành công.'}],    
    });

}


export default updateProductAttributes