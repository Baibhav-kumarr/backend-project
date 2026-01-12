import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
    username:{
        type:String,  required:true , unique:true , lowercase:true , trim:true, index:true
    },//i wawnt ki username pe searching fast ho so index:true
    email:{type:String,  required:true , unique:true , lowercase:true , trim:true},
    fullname:{type:String,  required:true , trim:true , index:true},
    avatar:{type:String,require:true , default:""},//url aa raha hai wahi store kar rahe  cloudinary se
    coverImage:{type:String},
    watchHistory:[{type: Schema.Types.ObjectId, ref:"Video"}],
    password:{type:String, required:[true, "Password is required"]}, //dbb me password ham hash kar ke store karenge
    refreshToken:{type:String},
    },{ timestamps:true}
);

userSchema.pre("save", async function (next) {
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
})
//👉 this.isModified("password") check karta hai password naya/updated hai ya nahi; agar change nahi hua to hashing skip karke directly save karta hai.

//ABB MAKING METHID SO THAT JAB BHI USER KO IMPORT KARAYE 
//USHE PUCH LE KI PASSWORD MATCH KARTA HAI YA NHI
//jaise middle ware bana sakte hai waise he we can make methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password);
    //bcrypt  give true or false
}

userSchema.methods.generateAccessToken = function(){
    const token = jwt.sign({ _id: this._id, username: this.username , email: this.email },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
);
    return token;
}

userSchema.methods.generateRefreshToken = function(){
    const token = jwt.sign({ _id: this._id },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
);
    return token;
}

const User = mongoose.model("User", userSchema);
export default User;

