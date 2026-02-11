import { Outlet } from 'react-router-dom'
import ScrollToTop from '../components/ScrollToTop'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <ScrollToTop />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
