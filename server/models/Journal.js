import mongoose from "mongoose";

const Schema = mongoose.Schema;

const JournalSchema = new Schema({
    year: {type: Number, required: true},   // год выпуска
    period: {type: Number, requierd: true}, // какой квартал года
    image: {type: String, required: true, default: "journalImage.png"}, // картинка журнала
})

const Journal = mongoose.model("Journal", JournalSchema);

export default Journal;