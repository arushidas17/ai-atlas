import { Routes, Route } from 'react-router-dom'
import ToolsListPage from './pages/ToolsListPage'
import ToolDetailPage from './pages/ToolDetailPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<ToolsListPage />} />
      <Route path="/tools/:slug" element={<ToolDetailPage />} />
    </Routes>
  )
}

export default App