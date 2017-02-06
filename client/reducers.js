const { ADD_TODO, REMOVE_TODO, TOGGLE_COMPLETE, SHOW_COMPLETED, SHOW_NOT_COMPLETED, CLEAR_COMPLETED } = require('./constants')

function createReducer(initialState, handlers = {}) {
	return function reducer(state = initialState, action) {
		const handler = handlers[action.type]
		return handler ? handler(state, action) : state
	}
}

const initialState = {
	todoList: [],
	filter: false,
	todosLeft: 0,
	filteredList: ''
}

module.exports = createReducer(initialState, {
	[ADD_TODO]: (state, action) => {
		return { 
			...state,
			todoList: [ ...state.todoList, { id: action.id, data: action.data, completed: action.completed }],
			todosLeft: state.todosLeft + 1
		}
	},
	[REMOVE_TODO]: (state, action) => {
		let a = state.todoList
		let b = a.splice(action.data.id, 1)
		return {
			...state,
			todoList: a,
			todosLeft: state.todosLeft - 1
		}
	},
	[TOGGLE_COMPLETE]: (state, action) => {
		let completed
		let count
		if (action.data.completed === false) {
            completed = true
			count = state.todosLeft - 1
        } else {
            completed = false
			count = state.todosLeft + 1
        }
		state.todoList[action.data.id].completed = completed
		return { 
			...state,
			todoList: state.todoList,
			todosLeft: count
		}
	},
	[SHOW_COMPLETED]: (state, action) => {
		let filter = state.todoList.filter(t => t.completed)
		return { 
			...state,
			filteredList: filter.length <= 0 ? null : filter,
		}
	},
	[SHOW_NOT_COMPLETED]: (state, action) => {
		let filter = state.todoList.filter(t => !t.completed)
		return { 
			...state,
			filteredList: filter.length <= 0 ? null : filter,
		}
	},
	[CLEAR_COMPLETED]: (state, action) => {
		return {
			...state,
			todoList: state.todoList.filter(t => !t.completed)
		}
	}
})

