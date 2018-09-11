require("babel-register")
require("babel-polyfill")
import { hot } from 'react-hot-loader'
import createHistory from 'history/createHashHistory' // createBrowserHistory ， createHashHistory
import createLoading from 'dva-loading'
import router from './router/index'
import dva from 'dva'
import { loadModels } from 'utils/utilsModels'

hot(module)

const app = dva({
  history: createHistory()
})

app.use(createLoading())

loadModels(app)

app.router(router)

app.start('#app')

export default app._store
