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
    async getJournalById(req, res, next){
        try{
            const journal = await journalService.getJournalById(req.params.id);
            return res.json(journal);
        }catch(e){
            next(e);
        }
    }
    async updateJournal(req, res, next){
        try{
            const journal = await journalService.updateJournal(req.params.id, req.body, req.file);
            return res.json(journal);
        }catch(e){
            next(e);
        }
    }
    async deleteJournal(req, res, next){
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