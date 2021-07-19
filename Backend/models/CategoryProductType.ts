import mongoose , { Document,  Model} from "mongoose"
import { CategoryDocument } from "@/models/Category"
import { ProductTypeDocument } from "@/models/ProductType"
import { UserDocument } from '@/models/User'


const CategoryProductTypeSchema = new mongoose.Schema ({
    categoryID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
   },
   productTypeID: {
      
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ProductType'
    
   },
   createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
   },
   updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
}
   
}, { timestamps: true})

export interface ICategoryProductType {
    categoryID: CategoryDocument['_id'],
    productTypeID: ProductTypeDocument['_id'],
    createdBy: UserDocument['_id'],
    updatedBy: UserDocument['_id'],
}
export interface CategoryProductTypeDocument extends ICategoryProductType, Document {
	
}

const CategoryProductType : Model<CategoryProductTypeDocument> = mongoose.models.CategoryProductType || mongoose.model<CategoryProductTypeDocument>("CategoryProductType",CategoryProductTypeSchema);

export default CategoryProductType;
