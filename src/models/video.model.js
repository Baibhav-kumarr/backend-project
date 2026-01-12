import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new mongoose.Schema({
    videoFile:{type:String, required:true}, //url store karenge come from cloudinary
    thumbnail:{type:String, required:true}, //url store karenge come from cloudinary
    title:{type:String, required:true},
    description:{type:String, required:true},
    duration:{type:Number, required:true}, //ye cloudinary se ayagae
    //after  storing of file cloudinary information bhejta hai file ki like url , time duration
    views:{type:Number, default:0},
    isPublished:{type:Boolean, default:true},
    owner:{type: mongoose.Schema.Types.ObjectId, ref:"User", required:true}, //jo video upload karega uska id reference ke through
    },{ timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate);
const Video = mongoose.model("Video", videoSchema);
export default Video; 