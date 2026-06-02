import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientLogs from './pages/PatientLogs'
import UserList from './pages/UserList'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedPatient, setSelectedPatient] = useState(null)

  function handleSelectPatient(patient) {
    setSelectedPatient(patient)
    setActivePage('patientLogs')
  }

  function handleBackToPatients() {
    setActivePage('patients')
    setSelectedPatient(null)
  }

  function handleNavigate(page) {
    setActivePage(page)
    setSelectedPatient(null)
  }

  const renderPage = () => {
    if (activePage === 'patients') return <PatientList onSelectPatient={handleSelectPatient} />
    if (activePage === 'patientLogs') return <PatientLogs patient={selectedPatient} onBack={handleBackToPatients} />
    if (activePage === 'users') return <UserList />
    return <Dashboard onNavigate={handleNavigate} />
  }

  return (
    <div className="flex h-screen overflow-hidden bg-orange-50">
      <Sidebar activePage={activePage} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar activePage={activePage} patientName={selectedPatient?.name} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
