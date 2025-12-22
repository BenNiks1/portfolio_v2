import ReactDOM from 'react-dom'
import reportWebVitals from './reportWebVitals'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'

import './assets/styles/index.scss'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

reportWebVitals()
