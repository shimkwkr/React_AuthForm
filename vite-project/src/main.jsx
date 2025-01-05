import React from 'react';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/index.jsx'

async function prepare() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser.js')
    return worker.start({
      onUnhandledRequest: 'bypass',
    })
  }
  return Promise.resolve()
}
prepare().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </StrictMode>,
  )
})