import mongoose , { Document,  Model} from "mongoose"

const ExampleSchema = new mongoose.Schema({
    name:{
        required : true,
        type : String
    },
    age :{
        type : String
    },
    createdAt: { 
        type: Date,
        default: Date.now
    },
    // user : {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    createBy :{
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'
    }


});
export interface IExample {
    name: string,
    age: string,
    createBy:mongoose.Schema.Types.ObjectId;
}
export interface ExampleDocument extends IExample, Document {
	
}

const Example : Model<ExampleDocument> = mongoose.models.Example || mongoose.model<ExampleDocument>("Example",ExampleSchema);

export default Example;