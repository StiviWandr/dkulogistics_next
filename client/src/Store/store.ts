import { configureStore, Middleware } from '@reduxjs/toolkit'

const localStorageMiddleware: Middleware = ({ getState }) => next => action => {
	const result = next(action);
	localStorage.setItem('user_hash', getState().users.user_hash);
	localStorage.setItem('stay_logged', getState().users.stayLogged);
	if (!localStorage.getItem('user_time')) localStorage.setItem('user_time', new Date().toString());
	return result;
};

const loadFromLocalStorage: any = () => {
	if (localStorage.getItem('user_hash') !== null) {
		if (localStorage.getItem("stay_logged") !== null || localStorage.getItem("stay_logged") !== "undefined") {
			return { users: { user_hash: localStorage.getItem('user_hash'), stayLogged: localStorage.getItem("stay_logged") } }
		}
		return { users: { user_hash: localStorage.getItem('user_hash') } }

	}
}
export const store = configureStore({
    reducer: {

    }
})
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch