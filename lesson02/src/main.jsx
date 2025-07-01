import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Welcome from './components/Welcome.jsx'
import LightToggle from './components/LightToggle.jsx'
import InputState from './components/InputState.jsx'
import Calculator from './components/Calculator.jsx'
// React.StrictMode 에서 React 생략 가능(ReactDom 도 생략가능)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App />
    <Welcome/> */}
    {/* <LightToggle/> */}
    {/* <InputState/> */}
    <Calculator/>
  </StrictMode>,
)
