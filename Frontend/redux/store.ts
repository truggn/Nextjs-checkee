import { applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createWrapper } from 'next-redux-wrapper'
import { createLogger } from 'redux-logger'
import rootReducer from './reducers/index'
import rootSaga from './sagas/index'

// Lưu các state của store
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializesState = JSON.stringify(state);
    localStorage.setItem("state", serializesState);
  } catch (err) {
    console.log(err);
  }
};

const persistedState = loadState();

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware,createLogger()))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(rootReducer, persistedState, bindMiddleware([sagaMiddleware]))

  sagaMiddleware.run(rootSaga)

  store.subscribe(() => {
    saveState(store.getState());
  });
  return store
}

const wrapper = createWrapper(makeStore)
export default wrapper