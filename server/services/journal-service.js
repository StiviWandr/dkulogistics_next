
import * as dotenv from "dotenv"
import ApiError from "../extensions/app-errors.js";
import Article from "../models/Article.js";
import Journal from "../models/Journal.js";
dotenv.config()
class JournalService{
    async createJournal(reqData){
        const data = reqData;
        const check = await Journal.findOne({year: data.year, period: data.period})
        if(check){
            throw ApiError.BadRequest(`Такой журнал уже существует`)
        }
        const journal = await Journal.create({year: data.year, period: data.period})
        return journal;
    }
    async getJournals(){
        const journals = await Journal.find()
        journals.sort((a, b) => a.year < b.year ? 1 : -1);
        return journals;
    }
    
    async deleteJournal(id){
        const check = await Journal.findById(id)
        if(!check){
            throw ApiError.BadRequest(`Такой журнал не существует`)
        }
        const journal = await Journal.deleteOne(check)
        return journal;
    }
}
const journalService = new JournalService();

export default journalService;