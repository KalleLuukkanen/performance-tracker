import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import LoginOrRegister from './features/auth/LoginOrRegister'
import Layout from './layout/Layout'
import RequireAuth from './features/auth/RequireAuth'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginOrRegister isLogin={true} />} />
        <Route path="/register" element={<LoginOrRegister isLogin={false} />} />
        <Route path="/about" element={<About />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
