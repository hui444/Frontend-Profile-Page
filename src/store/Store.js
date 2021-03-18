import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { profile } from "./profile/reducer";
import { loadState, saveState } from "./localStorage";
import throttle from "lodash.throttle";

const middlewares = [thunk];

const persistedState = loadState();

export const rootReducer = combineReducers({ profile, persistedState });

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

store.subscribe(
  throttle(() => {
    saveState({
      todos: store.getState().todos,
    });
  }, 1000)
);

export default store;