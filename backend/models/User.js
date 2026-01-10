import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"] ,
        validate: {
      validator: function (v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`
    },
    },
    password: {
        type: String,
        minlength: [4, 'Password must be at least 8 characters long'],
        required: true 
    },
    role: {
        type: String,
        enum: {
      values: ['user', 'admin'],
      message: '{VALUE} is not supported'
    },
        default: 'user'
    },

}, {timestamps: true});
//timestamps le create gareko time dincha


const User = mongoose.model('User', userSchema);


export default User;

