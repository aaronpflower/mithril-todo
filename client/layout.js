const m = require('mithril')
const styles = require('./layout.styl')
const actions = require('./actions')

module.exports = {
    oninit({attrs}) {
        const { store } = attrs
        this.btnText = 'Create Todo'
        this.setValue = (v) => {
			this.newTodo = v
		}
        this.todoList = []

        this.createTodo = () => {
            if (typeof this.newTodo !== 'undefined') {
                store.dispatch(actions.addTodo(this.newTodo))
                this.newTodo = ''
            } else {
                this.btnText = 'Cant create an empty todo'
            }
        }
        this.remove = (todo) => {
            store.dispatch(actions.removeTodo(todo))
        }
        this.clearCompleted = () => {
            store.dispatch(actions.clearCompleted())
        }
        this.completed = (item) => {
            store.dispatch(actions.toggleComplete(item))
        }
        this.showCompleted = () => {
            store.dispatch(actions.showCompleted())
        }
        this.showNotCompleted = () => {
            store.dispatch(actions.showNotCompleted())
        }
    },
    view({ attrs }) {
        const { store } = attrs
        const state = store.getState()
        let list

        if (state.filteredList === null) {
            list = state.todoList
            this.btnText = 'Nothing to filter'
        } else if (state.filteredList.length > 0) {
            list = state.filteredList
            this.btnText = 'Create Todo'
        } else {
            list = state.todoList
            this.btnText = 'Create Todo'
        }

        return m('div', {class: styles.container }, [
            m('h1', 'To Do List'),
            m('div', { class: styles.todoList }, [
                m('input', {
                    class: styles.input,
                    placeholder: 'What Nees to be done?',
                    oninput: m.withAttr('value', this.setValue),
                    value: this.newTodo,
                }),
                state.todoList.length > 0 ? m('ul', { class: styles.filter }, [
                    m('li', { class: styles.filterItem }, state.todosLeft + ' items left'),
                    m('li', { onclick: this.showNotCompleted, class: styles.filterItem }, 'Active'),
                    m('li', { onclick: this.showCompleted, class: styles.filterItem }, 'Completed'),
                    m('li', { onclick: this.clearCompleted, class: styles.filterItem }, 'Clear Completed')
                ]) : null,
                list.map((item, i) => m('div', { class: styles.listItem }, [
                    m('label', { class: styles.label }, [
                        m('span', [
                            m('input', {
                                class: styles.checkboxInput,
                                type: 'checkbox',
                                checked: item.completed,
                                onchange: m.withAttr('checked', () => this.completed(item)),
                            }),
                            m('span', { class: styles.checkboxValue, ariaHidden: true }),
                        ]),
                    ]),
                    m('h1', item.data),
                    m('img', { class: styles.close, onclick: () => this.remove(item), src: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Transparent_X.png' })
                ])),

                m('button', { class: styles.button, onclick: this.createTodo }, this.btnText)
            ])
        ])
    }
}