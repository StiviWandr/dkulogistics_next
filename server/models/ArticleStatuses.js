import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ArticleStatusSchema = new Schema({
    name: {type: String, required: true},
})

const ArticleStatus = mongoose.model("ArticleStatus", ArticleStatusSchema);

export default ArticleStatus;