const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 15,
        trim: true,

    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    role: {
        type: String,
        default: 'user',
        required: true
    },
    created : {
        type : Date, 
        default: Date.now 
    }
  });
  
  const User = Mongoose.model("user", UserSchema);
  
  module.exports = User;
  
  








