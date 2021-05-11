import { createStore, combineReducers, compose, applyMiddleware } from "redux";
//ducks
import taskReducer from "../redux/ducks/taskDuck";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  task: taskReducer,
});

// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose;

// let composeEnhancers =
//   (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] as typeof compose) || compose;
export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export default function generateStore() {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
}
