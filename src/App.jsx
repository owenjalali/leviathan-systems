import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import About from './pages/About'
import Infrastructure from './pages/Infrastructure'
import Begin from './pages/Begin'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="infrastructure" element={<Infrastructure />} />
          <Route path="begin" element={<Begin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
