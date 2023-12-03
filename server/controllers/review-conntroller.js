import reviewService from "../services/review-service.js";



class ReviewController {
    async addReview (req, res, next){
        try{
            const review = await reviewService.createReview(req.body, req.user.id)
            return res.json(review)
        }catch(e){
            next(e)
        }
    }
}

const reviewController = new ReviewController;
export default reviewController;