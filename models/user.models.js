const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        unique:true,
        required : true
    },
    email : {
        type : String,
        unique:true,
        required : true
    },
    password : {
        type : String,
        required : true,
        trim :  true
    }

},{timestamps:true}
)

const userModel = mongoose.model("userModel",UserSchema);
module.exports = userModel;