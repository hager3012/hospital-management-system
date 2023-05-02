import mongoose from "mongoose";
const Schema =mongoose.Schema;
const RoomSchema=new Schema({
        status:{
            type:String,
            required:true,
            default:'false'
        },
        RoomType:{
            type:String,
            required:true
        }
},
{
    timestamps:true
})
export const Room=mongoose.model('Room',RoomSchema);