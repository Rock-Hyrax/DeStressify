import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import App from './App'
import './index.css'

const theme = createTheme({
  palette: { mode: 'dark' }
})

const root = createRoot(document.getElementById('root') as HTMLElement)

window.api.getRange(Date.now() - 3600 * 1000, Date.now())
window.api.onReport((value) => {
  console.log(value)
})

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
)
