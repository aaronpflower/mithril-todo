const m = require('mithril')
const styles = require('./layout.styl')

module.exports = {
    oninit({attrs}) {
        this.btnText = 'Create Todo'
        this.setValue = (v) => {
			this.todoItem = v
		}
        this.todoList = []
        this.filteredTodos = []
        this.filter = false
        this.currentFilter = () => this.todoList.filter(item => item.completed === this.filter)

        this.filterTodos = () => {
            this.filteredTodos = this.currentFilter()
        }

        this.createTodo = () => {
            if (typeof this.todoItem !== 'undefined') {
                this.todoList.push({ title: this.todoItem, completed: false })
                this.filterTodos()
                this.todoItem = ''
                this.itemsLeft = this.todoList.length
            } else {
                this.btnText = 'Cant create an empty todo'
            }
        }
        this.remove = (todo) => {
            let index = this.todoList.indexOf(todo)
            if (index > -1) this.filteredTodos.splice(index, 1)
        }
        this.clearCompleted = () => {
            this.todoList.map((item, i) => {
                if (item.completed === true) {
                    this.todoList.splice(i, 1)
                }
                this.filteredTodos = this.todoList
            })
        }
        this.completed = (item) => {
            if (item.completed === false) {
                item.completed = true
            } else {
                item.completed = false
            }
            this.filteredTodos = this.todoList.filter(item => item.completed === false)
            this.itemsLeft = this.filteredTodos.length
        }
        this.filterCompleted = () => {
            this.filter = true
            return this.filterTodos()
        }
        this.filterActive = () => {
            this.filter = false
            return this.filterTodos()
        }
    },
    view({ state, attrs }) {
        return m('div', {class: styles.container }, [
            m('h1', 'To Do List'),
            m('div', { class: styles.todoList }, [
                m('input', {
                    class: styles.input,
                    placeholder: 'What Nees to be done?',
                    oninput: m.withAttr('value', this.setValue),
                    value: this.todoItem,
                }),
                this.todoList.length > 0 ? m('ul', { class: styles.filter }, [
                    m('li', { class: styles.filterItem }, this.itemsLeft + ' items left'),
                    m('li', { onclick: this.filterActive, class: styles.filterItem }, 'Active'),
                    m('li', { onclick: this.filterCompleted, class: styles.filterItem }, 'Completed'),
                    m('li', { onclick: this.clearCompleted, class: styles.filterItem }, 'Clear Completed')
                ]) : null,
                this.filteredTodos.map((item, i) => m('div', { class: styles.listItem }, [
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
                    m('h1', item.title),
                    m('img', { class: styles.close, onclick: () => this.remove(item), src: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Transparent_X.png' })
                ])),

                m('button', { class: styles.button, onclick: this.createTodo }, this.btnText)
            ])
        ])
    }
}