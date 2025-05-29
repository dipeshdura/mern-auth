import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store } from './redux/store.js'
import {Provider} from "react-redux"
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Don't forget this

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={300}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable
    />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
