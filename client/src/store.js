import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import rootReducer from './Modules/rootReducer';


export const history = createBrowserHistory();

const middleware = [];
middleware.push(thunk);
middleware.push(promise);
middleware.push(routerMiddleware(history));
const logger = createLogger({
    // ...options
});
middleware.push(logger)


const store = createStore(
    rootReducer(history),
    applyMiddleware(...middleware)
);

export default function configureStore() {
    return store
}
