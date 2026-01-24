import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import CreateFeedback from './pages/CreateFeedback'
import PublicFeedback from './pages/PublicFeedback'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateFeedback />} />
        <Route path="/feedback" element={<PublicFeedback />} />
      </Routes>
    </Router>
  )
}

export default App
