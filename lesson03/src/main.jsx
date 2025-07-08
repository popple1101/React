import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { PreviousValue } from './RefHookTest'
import App from './App'
// import App from './ArrayTest.jsx'
// import App from './App'
// import App from './App_V1.jsx'
// import FocusInput from './RefHookTest.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {/* ref 훅 테스트 */}
    {/* <FocusInput/> */}
    {/* <PreviousValue /> */}
  </StrictMode>
  
)
