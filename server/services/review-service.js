
import * as dotenv from "dotenv"
import ApiError from "../extensions/app-errors.js";
import Review from "../models/Review.js";

dotenv.config()

class ReviewService{
    async createReview(reqData, userId){
        const review = await Review.create({
            reviewer: userId,
            article: reqData.article,
            comment: reqData.comment
        })
        return review;
    }
}
const reviewService = new ReviewService();

export default reviewService;