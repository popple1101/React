import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ScheduleTable from './ScheduleTable.jsx'
import ScheduleTableEx from './ScheduleTableEx.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <ScheduleTable /> */}
    <ScheduleTable />
  </StrictMode>,
)
