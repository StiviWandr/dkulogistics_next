import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    reviewer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: "Article",
        required: true
    },
    comment: {
        type: String,
        required: false
    },
    created_at: {
        type: String,
        default: new Date()
    },
})

const Review = mongoose.model("Review", ReviewSchema);

export default Review;