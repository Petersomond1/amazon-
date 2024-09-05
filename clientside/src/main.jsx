import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { AuthProvider } from './context/AuthContext.jsx'

import { Provider } from "react-redux";
import {store, persistor  } from './redux/store.js'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StrictMode>
    <App />
  </StrictMode>,
  </AuthProvider>
  </QueryClientProvider>
  </Provider>
)
