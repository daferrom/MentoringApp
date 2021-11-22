import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.module.css'
import { BrowserRouter as Router } from 'react-router-dom'
import DataProvider from './redux/store'

ReactDOM.render(
  <DataProvider>
    <Router>
      <App />
    </Router>
  </DataProvider>,
  document.getElementById('root')
)