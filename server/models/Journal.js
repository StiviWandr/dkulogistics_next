import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    year: {type: Number, required: true},
    period: {type: Number, requierd: true},
    image: {type: String, required: true, default: "journalImage.png"},
})

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;