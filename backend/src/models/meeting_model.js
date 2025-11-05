import mongoose from "mongoose";
const Schema=mongoose.Schema;

const meetingSchema = new Schema({
    user_Id: {type: String},
  meetingCode: {type: String, required: true},
date: {type: Date, default: Date.now,required: true},
});
const Meeting=mongoose.model("Meeting",meetingSchema);
export {Meeting};