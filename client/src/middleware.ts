import { stackMiddlewares } from "./middlewares/stackHandler";
import { translation } from "./middlewares/translation";

const middlewares = [translation];
export default stackMiddlewares(middlewares);

// applies this middleware only to files in the app directory
export const config = {
    matcher: '/((?!api|static|.*\\..*|_next).*)'
};