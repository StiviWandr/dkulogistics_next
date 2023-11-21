import sendArticle  from './../Modules/Account/SendArticle/redux/sendArticle';
import { configureStore, Middleware } from '@reduxjs/toolkit'
import userSlice from './Slices/clientSlices/userSlice';
const localStorageMiddleware: Middleware = ({ getState }) => next => action => {
	const result = next(action);
	if (typeof window !== 'undefined') {
		localStorage.setItem('token', getState().user.token);
		localStorage.setItem('userinfo', JSON.stringify(getState().user.info));
	}
	return result;
};

const loadFromLocalStorage: any = () => {
	if (typeof window !== 'undefined') {
		if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== "null") {
			if (localStorage.getItem('userinfo')) {
				const userinfo = localStorage.getItem('userinfo');
				return {
					user: {
						token: localStorage.getItem('token'),
						info: JSON.parse(userinfo || "")
					}
				};
			}
		}
	}
};
export const store = configureStore({
    reducer: {
		user: userSlice,
		sendArticle: sendArticle
    },
	preloadedState: loadFromLocalStorage(),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}).concat(localStorageMiddleware),

})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch