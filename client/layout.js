const m = require('mithril')
const styles = require('./layout.styl')

module.exports = {
    oninit({attrs}) {
        this.btnText = 'Create Todo'
        this.setValue = (v) => {
			this.todoItem = v
		}
        this.todoList = []
        this.createTodo = () => {
            if (typeof this.todoItem !== 'undefined') {
                this.todoList.push({ title: this.todoItem, completed: false })
                this.todoItem = ''
            } else {
                this.btnText = 'Cant create an empty todo'
            }
        }
        this.remove = (todo) => {
            console.log(todo)
            let index = this.todoList.indexOf(todo)
            if (index > -1) this.todoList.splice(index, 1)
        }
    },

    view({ state, attrs }) {
        return m('div', {class: styles.container }, [
            m('h1', 'Todos'),
            m('div', { class: styles.todoList }, [
                m('input', {
                    class: styles.input,
                    placeholder: 'What Nees to be done?',
                    oninput: m.withAttr('value', this.setValue),
                    value: this.todoItem,
                }),

                state.todoList.map((item, i) => m('div', { class: styles.listItem }, [
                    m('label', { class: styles.label }, [
                        m('span', [
                            m('input', {
                                class: styles.checkboxInput,
                                type: 'checkbox',
                                checked: item.completed,
                                onclick: m.withAttr('checked', () => { item.completed === true }),
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