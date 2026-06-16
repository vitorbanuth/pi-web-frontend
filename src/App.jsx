import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import Dashboard from './pages/Dashboard'
import PatientList from './pages/PatientList'
import PatientLogs from './pages/PatientLogs'
import SuggestionList from './pages/SuggestionList'
import PatientSuggestions from './pages/PatientSuggestions'
import MealPlanList from './pages/MealPlanList'
import PatientMealPlan from './pages/PatientMealPlan'
import UserList from './pages/UserList'

function App() {
  const [activePage, setActivePage] = useState('dashboard')
  const [selectedPatient, setSelectedPatient] = useState(null)

  function handleSelectPatient(patient, dest = 'patientLogs') {
    setSelectedPatient(patient)
    setActivePage(dest)
  }

  function handleBackToPatients() {
    setActivePage('patients')
    setSelectedPatient(null)
  }

  function handleBackToSuggestions() {
    setActivePage('suggestions')
    setSelectedPatient(null)
  }

  function handleNavigate(page) {
    setActivePage(page)
    setSelectedPatient(null)
  }

  const renderPage = () => {
    if (activePage === 'patients')           return <PatientList onSelectPatient={p => handleSelectPatient(p, 'patientLogs')} />
    if (activePage === 'patientLogs')        return <PatientLogs patient={selectedPatient} onBack={handleBackToPatients} />
    if (activePage === 'suggestions')        return <SuggestionList onSelectPatient={p => handleSelectPatient(p, 'patientSuggestions')} />
    if (activePage === 'patientSuggestions') return <PatientSuggestions patient={selectedPatient} onBack={handleBackToSuggestions} />
    if (activePage === 'mealPlan')           return <MealPlanList onSelectPatient={p => handleSelectPatient(p, 'patientMealPlan')} />
    if (activePage === 'patientMealPlan')    return <PatientMealPlan patient={selectedPatient} onBack={() => { setActivePage('mealPlan'); setSelectedPatient(null) }} />
    if (activePage === 'users')              return <UserList />
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
