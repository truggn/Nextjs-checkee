import mongoose , { Document,  Model} from "mongoose"

const TestSchema = new mongoose.Schema({
    title:{
        type : String
    },
    content :{
        type : String
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    user : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    createBy :{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }


});
export interface ITest {
    title: string,
    content: string
    user:mongoose.Schema.Types.ObjectId;
    createBy:mongoose.Schema.Types.ObjectId;
}
export interface TestDocument extends ITest, Document {
	
}

const Test : Model<TestDocument> = mongoose.models.Test || mongoose.model<TestDocument>("Test",TestSchema);

export default Test;