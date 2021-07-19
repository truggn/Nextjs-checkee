import mongoose , { Document,  Model} from "mongoose"
import { CategoryDocument } from "@/models/Category"
import { UserDocument } from "@/models/User"

const HomeCategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        ref: 'Category'
    },
    icon: {
        type: String,
        ref: 'Category'
    },
    index: {
        type: Number,
        unique: true,
        required: true,
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer number'
        }
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

export interface IHomeCategory {
    category: CategoryDocument['_id'],
    name: CategoryDocument['name'],
    icon: CategoryDocument['icon'],
    index: number,
    createdBy: UserDocument['_id'],
    updatedBy: UserDocument['_id'],
    deletedBy: UserDocument['_id'],
    
}
export interface HomeCategoryDocument extends IHomeCategory, Document {
	
}

const HomeCategory : Model<HomeCategoryDocument> = mongoose.models.HomeCategory || mongoose.model<HomeCategoryDocument>("HomeCategory",HomeCategorySchema);

export default HomeCategory;
