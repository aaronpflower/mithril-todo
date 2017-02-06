const m = require('mithril')
const { ADD_TODO, REMOVE_TODO, TOGGLE_COMPLETE, SHOW_COMPLETED, SHOW_NOT_COMPLETED, CLEAR_COMPLETED } = require('./constants')


const actions = {
	addTodo(todo) {
		return { type: ADD_TODO, data: todo, completed: false }
	},
    removeTodo(todo) {
        return { type: REMOVE_TODO, data: todo }
    },
    toggleComplete(item) {
        return { type: TOGGLE_COMPLETE, data: item }
    },
    showCompleted() {
        return { type: SHOW_COMPLETED }
    },
    showNotCompleted() {
        return { type: SHOW_NOT_COMPLETED }
    },
    clearCompleted() {
        return { type: CLEAR_COMPLETED }
    }
}

module.exports = actions
