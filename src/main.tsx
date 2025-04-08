import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'

import './index.css'
import App from './App.tsx'
import { store } from './store.ts'
import { SocketProvider } from './context/SocketContext.tsx'
import { VoiceCallProvider } from './context/VoiceCallContext.tsx'

const queryClient = new QueryClient()
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <SocketProvider>
          <VoiceCallProvider>
            <App />
          </VoiceCallProvider>
        </SocketProvider>
        <ToastContainer />
      </Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  </BrowserRouter>
  // </StrictMode>
)
