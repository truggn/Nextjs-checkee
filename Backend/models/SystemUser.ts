import mongoose, { Document, Model } from "mongoose";
// import bcrypt from "bcrypt";
var bcrypt = require('bcryptjs');

const SystemUserSchema = new mongoose.Schema({
	username: {
		type: String,
		// required: [true, "Name is required!"],
		// maxlength: [30, 'Name cannot be more than 60 characters'],
		trim: true,
	},
	password: {
		type: String,
    },
    
    status: {
        type: Number,
        enum: [1, 2, 3]
    },
    
    fullname: {
        type: String
    },

    birthday: {
        type: String,
    },
    
	address: {
		type: String,
		// required: [true, "Address is required!"],
		trim: true,
    },
    
    mobile: {
        type: String
    },

    email: {
        type: String
    },

    sex: {
        type: Number,
        enum: [1, 2, 3]
    },
    
    userTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'usertype'  
    },

    loginFailedCount: {
        type: Number
    },

    profileimage: {
        type: String
    },

    createdAt: {
        type: Date,
        required: true,
        default: Date.now    
    },

    updatedAt: {
        type: Date,
    },
    
    deletedAt: {
        type: Date
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    deletedBy: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'User'     
    },

    isDeleted: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true});

export interface ISystemUser {
	username: string;
    password: string;
    status: number;
    fullname: string;
    birthday: string;
    address: string;
    mobile: string;
    email: string;
    sex: number;
    userTypeId: mongoose.Schema.Types.ObjectId;
    loginFailedCount: number;
    profileimage: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
    createdBy: mongoose.Schema.Types.ObjectId;
    updatedBy: mongoose.Schema.Types.ObjectId;
    deletedBy: mongoose.Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface SystemUserDocument extends ISystemUser, Document {
	
}


function generatePasswordHash(password) {
    return bcrypt.genSalt(10) // 10 is default
    .then((salt) => {
      return bcrypt.hash(password, salt);
    })
    .then(hash => {
      return Promise.resolve(hash);
    });
};

// // Methods
// /**
//  * Validates user password with stored password hash
//  * @param password
//  * @returns {Promise}
//  */
// SystemUserSchema.methods.validatePassword = function (password) {
//     return bcrypt.compare(password, this.toObject().encryptedPassword);
// };

/**
 * Set user password
 * @param password
 * @returns {Promise}
 */
SystemUserSchema.methods.setPassword = function (user, password) {
    return generatePasswordHash(password)
            .then(hash => {
                user.encryptedPassword = hash;
                return user;
            });
    //return user;
};

SystemUserSchema.methods.beforeCreate = function (values, next) {
    generatePasswordHash(values.password)
            .then(hash => {
                delete(values.password);
                values.encryptedPassword = hash;
                next();
            })
            .catch(err => {
                /* istanbul ignore next */
                next(err);
            });
};

const SystemUser : Model<SystemUserDocument> = mongoose.models.SystemUser || mongoose.model<SystemUserDocument>("SystemUser", SystemUserSchema);

export default SystemUser;