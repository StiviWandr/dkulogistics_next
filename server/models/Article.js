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
    status: {
        type: Schema.Types.ObjectId,
        ref: "ArticleStatus"
    },
    files: {
        type: Array[String],
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

})

const Article = mongoose.model("Article", ArticleSchema);

export default Article;