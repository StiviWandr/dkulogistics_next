import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    journalId: {
        type: Schema.Types.ObjectId,
        ref: "Journal"
    },
    name: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    annotation: {
        type: String,
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    keywords: {
        type: [String],
    },
    status: {
        type: String,
        values: ["pending", "onReview", "canceled", "passedReview", "published"],
        default: "pending"
    },
    created_at: {
        type: String,
        default: new Date()
    },
    files: {
        type: Array,
        required: true
    },
    downloadCount: {
        type: Number,
        default: 0
    },
    liked: {
        type: Number,
        default: 0
    },
    isPaid: {
        type: Boolean,
        default: false
    }
})

const Article = mongoose.model("Article", ArticleSchema);

export default Article;