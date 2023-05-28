import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import vhCheck from 'vh-check'
import { router } from './routes/router'
import './global.scss'
import 'virtual:uno.css'
import 'virtual:svgsprites'
import { App } from './App'

vhCheck()

const div = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(div)
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
export { div as rootDiv }