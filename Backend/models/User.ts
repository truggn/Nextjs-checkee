import mongoose, { Document, Model } from "mongoose";
import type { ParticipantTypeDocument } from "@/models/ParticipantType";
// import bcrypt from "bcrypt";
var bcrypt = require("bcryptjs");
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { promises } from "dns";

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    firstName: {
      type: String,
      // required: [true, "firstName is required!"],
      // maxlength: [30, 'firstName cannot be more than 60 characters'],
      trim: true,
    },
    lastName: {
      type: String,
      // required: [true, "lastName is required!"],
      // maxlength: [30, 'lastName cannot be more than 60 characters'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Your password is required"],
      max: 100,
    },

    address: {
      type: String,
      // required: [true, "Address is required!"],
      trim: true,
    },
    phone: {
      type: String,
      // required: [true, "Phone is required!"],
      trim: true,
    },
    image_url: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
    },

    locked: {
      type: Boolean,
      default: false,
    },

    passwordFailures: {
      type: Number,
      default: 0,
    },

    lastPasswordFailure: {
      type: String,
    },

    allowReport: {
      type: Boolean,
      default: true,
    },

    userType: {
        type: String,
        // enum: ['SuperAdmin', 'Normal'],
        default: 'Normal',
    },

    userRole: {
      type: [String],
      enum: ["SuperAdmin", "Admin", "Normal"],
      default: ["Normal"],
    },

    isChildOf: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    resetToken: {
      type: String,
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
    },

    deletedAt: {
      type: Date,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    LAT: {
      type: Number,
    },

    LNG: {
      type: Number,
    },

    encryptedPassword: {
      type: String,
    },

    playerID: {
      type: String,
    },

    resetPasswordToken: {
      type: String,
      required: false,
    },

    resetPasswordExpires: {
      type: Number,
      required: false,
    },

    // taxCode: {
    //     type: Number,
    // },

    // bank: {
    //     type: String,
    // },

    // fax: {
    //     type: Number,
    // },

    // certificate_image: {
    //     type: Array,
    // },

    // account_number: {
    //     type: Number,
    // },

    birthday: {
      type: Date,
    },

    sex: {
      type: Number,
      enum: [1, 2, 3],
    },

    // status: {
    //     type: Number,
    //     enum: [1, 2, 3],
    //     default: 1,
    // },

    // code: {
    //     type: String,
    // },

    // participantType: {
    //     // type: mongoose.Schema.Types.ObjectId,
    //     // ref: 'ParticipantType',

    //     type: String,
    //     enum: ['Staff', 'Owner'],
    //     // default: 'Staff'
    // },

    // participantName: {
    //     type: String,
    // },

    // participantIsChildOf: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    // },

    // name_customer: {
    //     type: String,
    // },
    memberOfOrganizations: [
      {
        organizationId: String,
        organizationName: String,
      },
    ],
    userTypeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserType",
    },
  },
  { timestamps: true }
);
interface ImemberOfOrganizations {
  organizationId: String;
  organizationName: String;
}
export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  image_url: string;
  role: string;
  locked: boolean;
  passwordFailures: number;
  lastPasswordFailure: string;
  allowReport: string;
  userType: string;
  userRole: string[];
  isChildOf: mongoose.Schema.Types.ObjectId;
  owner: mongoose.Schema.Types.ObjectId;
  resetToken: string;
  createdAt: Date;
  updatedAt: string;
  deletedAt: string;
  createdBy: mongoose.Schema.Types.ObjectId;
  updatedBy: mongoose.Schema.Types.ObjectId;
  deletedBy: mongoose.Schema.Types.ObjectId;
  isDeleted: boolean;
  LAT: string;
  LNG: string;
  encryptedPassword: string;
  playerID: string;
  resetPasswordToken: string;
  resetPasswordExpires: number;
  birthday: Date;
  sex: number;
  status: number;
  userTypeId: mongoose.Schema.Types.ObjectId;
  memberOfOrganizations: ImemberOfOrganizations[];
  // customer
  // taxCode: number;
  // bank: string;
  // fax: number;
  // certificate_image: string;
  // account_number: number;
}

// User
export interface UserDocument extends IUser, Document {
  fullName: string;
  token: string;
  comparePassword(password: string): Promise<boolean>;
  generateJWT(): string;
  generatePasswordReset(): string;
}

// // Khách hàng
// export interface CustomerDocument extends IUser, Document{
//     taxCode: number;
//     bank: string;
//     fax: number;
//     certificate_image: string[];
//     account_number: number;
//     name_customer : string;
// }

// // Đối tượng tham gia vào chuỗi cũng ứng
// export interface ParticipantDocument extends IUser, Document{
//     code: string;
//     participantName: string;
//     // participantType: ParticipantTypeDocument['_id'];
//     participantType: string;
//     participantIsChildOf: mongoose.Schema.Types.ObjectId;
// }

async function generatePasswordHash(password: string) {
  return bcrypt
    .genSalt(10) // 10 is default
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then((hash) => {
      return Promise.resolve(hash);
    });
}

// // Methods
// /**
//  * Validates user password with stored password hash
//  * @param password
//  * @returns {Promise}
//  */
// UserSchema.methods.validatePassword = function (password) {
//     return bcrypt.compare(password, this.toObject().encryptedPassword);
// };

/**
 * Set user password
 * @param password
 * @returns {Promise}
 */
UserSchema.methods.setPassword = async function (
  user,
  password
): Promise<string> {
  return generatePasswordHash(password).then((hash) => {
    user.encryptedPassword = hash;
    return user;
  });
  //return user;
};

UserSchema.methods.beforeCreate = function (values, next) {
  generatePasswordHash(values.password)
    .then((hash) => {
      delete values.password;
      values.encryptedPassword = hash;
      next();
    })
    .catch((err) => {
      /* istanbul ignore next */
      next(err);
    });
};

// Virtuals
UserSchema.virtual("fullName").get(function (this: UserDocument): string {
  return this.firstName + " " + this.lastName;
});

// Hash password trước khi lưu
UserSchema.pre<UserDocument>("save", function (next) {
  const user = this;

  if (!this.isModified("password")) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      user.password = hash;

      next();
    });
  });
});

// Kiểm tra password
UserSchema.methods.comparePassword = async function (
  this: UserDocument,
  password
) {
  return bcrypt.compare(password, this.password);
};

export type PayloadJWT = {
  id: string;
  email: string;
  userType: string;
  userRole: string[];
};

// Tạo token
UserSchema.methods.generateJWT = function (this: UserDocument) {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate());

  let payload: PayloadJWT = {
    id: this._id,
    email: this.email,
    userType: this.userType,
    userRole: this.userRole,
  };

  const SECRET_KEY: string = process.env.JWT_SECRET ?? "";

  return jwt.sign(payload, SECRET_KEY, {
    expiresIn: "12h", //expires in
  });
};

// Tạo password reset
UserSchema.methods.generatePasswordReset = function (this: UserDocument) {
  this.resetPasswordToken = crypto.randomBytes(64).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const User: Model<UserDocument | any> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default User;
