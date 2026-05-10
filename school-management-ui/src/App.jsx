import { useState } from 'react'
import AddSchoolForm from './components/AddSchoolForm'
import SchoolList from './components/SchoolList'
import { GraduationCap } from 'lucide-react'

function App() {
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  // This function is passed to AddSchoolForm. 
  // When a new school is added, it updates the state, causing SchoolList to re-fetch!
  const handleSchoolAdded = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>
          <GraduationCap className="title-gradient" size={48} style={{ verticalAlign: 'middle', marginRight: '12px' }} />
          <span className="title-gradient">EduLocator</span>
        </h1>
        <p>The smartest way to manage and discover schools near you.</p>
      </header>

      <main className="content-grid">
        <AddSchoolForm onSchoolAdded={handleSchoolAdded} />
        <SchoolList refreshTrigger={refreshTrigger} />
      </main>
    </div>
  )
}

export default App
