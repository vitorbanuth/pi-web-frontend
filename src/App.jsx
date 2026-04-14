import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientDetail from './pages/PatientDetail'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedPatient, setSelectedPatient] = useState(null)

  function handleSelectPatient(patient) {
    setSelectedPatient(patient)
    setActivePage('patientDetail')
  }

  function handleBackToList() {
    setSelectedPatient(null)
    setActivePage('patients')
  }

  const renderPage = () => {
    if (activePage === 'patientDetail') {
      return <PatientDetail patient={selectedPatient} onBack={handleBackToList} />
    }
    if (activePage === 'patients') {
      return <PatientList onSelectPatient={handleSelectPatient} />
    }
    return <Dashboard onNavigate={setActivePage} />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar activePage={activePage} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
