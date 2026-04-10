import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import Listings from './pages/Listings'
import SingleProperty from './pages/SingleProperty'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SavedProperties from './pages/SavedProperties'
import AdminDashboard from './pages/AdminDashboard'

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/listings' element={<Listings />} />
        <Route path='/property/:id' element={<SingleProperty />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route
          path='/saved'
          element={
            <ProtectedRoute>
              <SavedProperties />
            </ProtectedRoute>
          }
        />
        <Route
          path='/admin'
          element={
            <ProtectedRoute adminOnly={true}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
