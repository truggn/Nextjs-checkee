import mongoose, { Document, Query, Model } from "mongoose";
// import { Company } from "./Company";

const EmployeeSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: [true, "Name is required!"],
		maxlength: [30, 'Name cannot be more than 60 characters'],
		trim: true,
	},
	lastName: {
		type: String,
	},
	dateOfBirth: {
		type: Date,
	},
	gender: {
		type: Number,
		enum: [0, 1],
		default: 0,
		required: true
	},
	email: {
		type: String,
		required: [true, "Email is required!"],
		trim: true,
	},
	address: {
		type: String,
		required: [true, "Address is required!"],
		trim: true,
	},
	phone: {
		type: String,
		required: [true, "Phone is required!"],
		trim: true,
	},
	image_url: {
		type: String,
	},
	likes: {
		type: Array,
	},
	dislikes: {
		type: Array,
	},
	// company: {
	// 	type: Schema.Types.ObjectId,
	// 	ref: "Company",
	// 	required: true
	// },
	createdAt: { type: Date, default: Date.now },
});

export interface IEmployee {
	firstName: string;
	lastName: string;
	dateOfBirth: string;
	gender: number;
	email: string;
	address: string;
	phone: string;
	image_url: string;
	likes: string[];
	dislikes: string[];
	// createdAt: string;
}

export interface EmployeeDocument extends IEmployee, Document {
	fullName: string;
	getGender(): string;
	// company: Company["_id"];
}

// Virtuals
EmployeeSchema.virtual("fullName").get(function (this: EmployeeDocument) : string {
	return this.firstName + ' ' + this.lastName
})

// Methods
EmployeeSchema.methods.getGender = function (this: EmployeeDocument) : string {
	return this.gender > 0 ? "Male" : "Female"
}

EmployeeSchema.pre<Query<any,EmployeeDocument>>('find', async function () {
	return console.log('pre')
});

const Employee : Model<EmployeeDocument> = mongoose.models.Employee || mongoose.model<EmployeeDocument>("Employee", EmployeeSchema);

export default Employee;