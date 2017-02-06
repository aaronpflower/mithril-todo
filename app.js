require('./client/base/base.styl')

const m = require('mithril')
const layout = require('./client/layout')
const store = require('./client/store')()

m.mount(document.body, { view: () => m(layout, { store })})
