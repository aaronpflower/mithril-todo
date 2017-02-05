require('./client/base/base.styl')

const m = require('mithril')
const layout = require('./client/layout')


m.mount(document.body, { view: () => m(layout) })
