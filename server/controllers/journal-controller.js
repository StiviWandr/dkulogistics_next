import journalService from "../services/journal-service.js";

class JournalController {
    
    async createJournal(req, res, next){
        try{
            const journalData = req.body;
            const newJournal = await journalService.createJournal(journalData)
            return res.json(newJournal)
        }catch(e){
            next(e);
        }
    }
    async getJournals(req, res, next){
        try{
            const journals = await journalService.getJournals();
            return res.json(journals);
        }catch(e){
            next(e);
        }
    }
    async deleteJorunal(req, res, next){
        try{
            const journal = await journalService.deleteJournal(req.params.id);
            return res.json(journal);
        }catch(e){
            next(e);
        }
    }
}

const journalController = new JournalController;
export default journalController;