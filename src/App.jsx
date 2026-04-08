import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'

function App() {
  const [activePage, setActivePage] = useState('dashboard')

  const renderPage = () => {
    if (activePage === 'patients') return <PatientList />
    return <Dashboard onNavigate={setActivePage} />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar activePage={activePage} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
