
import mongoose , { Document,  Model} from "mongoose"
import { UserDocument } from '@/models/User'
import { HomeCategoryDocument } from "@/models/HomeCategory";


const CategorySchema = new mongoose.Schema({
  code: {     
      type: String,
      unique: true,
      required: true
  },
  name: {
      type: String
  },
  description: {
      type: String
  },
  icon: {
    type: String
  },
  level: {
      type: Number,
      enum: [1, 2, 3],
      required: true
  },
  subcategoryId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  parentsId: {
    idCategoryLevel_1: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'     
    },
    idCategoryLevel_2: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category'     
    }
  },
  isHomeCategory: {
    type: Boolean
  },
  indexHomeCategory: {
    type: Number,
    unique: true,
    required: true,
    validate: {
        validator: Number.isInteger,
        message: '{VALUE} is not an integer number'
    }
  },
  updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' 
  },
  deletedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  deletedAt: {
      type: Date,
  },
  isDeleted: {
      type: Boolean,
      default: false   
  }
}, { timestamps: true });

export interface ICategory {
    code: string,
    name: string,
    description: string,
    icon: string,
    level: number,
    subcategoryId: [mongoose.Schema.Types.ObjectId],
    parentsId: {
      idCategoryLevel_1: mongoose.Schema.Types.ObjectId,
      idCategoryLevel_2: mongoose.Schema.Types.ObjectId
    },
    isHomeCategory: boolean,
    indexHomeCategory: number,
    isDeleted: boolean,
    createdBy: UserDocument['_id'],
    updatedBy: UserDocument['_id'],
    deletedBy: UserDocument['_id'],
}
export interface CategoryDocument extends ICategory, Document {
	
}

const Category : Model<CategoryDocument> = mongoose.models.Category || mongoose.model<CategoryDocument>("Category",CategorySchema);

export default Category;