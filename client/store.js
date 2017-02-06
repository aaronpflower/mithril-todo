var m = require('mithril')
var { createStore, applyMiddleware, compose } = require('redux')
var rootReducer = require('./reducers')

function mithrilMiddleware() {
	return next => action => {
		next(action)
		// Delay redraw to avoid calling within mithril lifecycle method.
		window.requestAnimationFrame(m.redraw)
	}
}

const middleware = [
	mithrilMiddleware,
]

const enhancer = applyMiddleware(...middleware)
// Support for https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

module.exports = function configureStore(initialState) {
	const store = createStore(rootReducer, initialState, composeEnhancers(enhancer))
	return store
}
