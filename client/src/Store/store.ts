import sendArticle  from './../Modules/Account/SendArticle/redux/sendArticle';
import { configureStore, Middleware } from '@reduxjs/toolkit'
import userSlice from './Slices/userSlice';
import journalsSlice from '@/Modules/JournalsList/redux/journalsSlice';
import myArticlesRequestSlice from '@/Modules/Account/MyArticlesRequests/redux/myArticlesRequestSlice';
import reviewingArticlesSlice from '@/Modules/Reviewing/ReviewingArticles/redux/reviewingArticlesSlice';
const localStorageMiddleware: Middleware = ({ getState }) => next => action => {
	const result = next(action);
	localStorage.setItem('token', getState().user.token);
		
	return result;
};

const loadFromLocalStorage: any = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "null") {
			return {
				user: {
					token: localStorage.getItem('token'),
				}
			};
		}
	}
};
export const store = configureStore({
    reducer: {
		user: userSlice,
		sendArticle: sendArticle,
		journals: journalsSlice,
		myArticlesRequests: myArticlesRequestSlice,
		reviewingArticles: reviewingArticlesSlice
		
    },
	preloadedState: loadFromLocalStorage(),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}).concat(localStorageMiddleware),

})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch