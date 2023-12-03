import ApiError from "../extensions/app-errors.js";

const permit = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            throw ApiError.UnauthorizedError()
        }
        if (!roles.includes(req.user.role)) {
            throw new ApiError(403, "Неподходящие права")
        }
        next();
    }
}
export default permit;
