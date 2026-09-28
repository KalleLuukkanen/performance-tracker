import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import LoginOrRegister from './features/auth/LoginOrRegister'
import Layout from './layout/Layout'
import RequireAuth from './features/auth/RequireAuth'
import Phases from './pages/Phases'

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/login" element={<LoginOrRegister isLogin={true} />} />
        <Route path="/register" element={<LoginOrRegister isLogin={false} />} />
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/phases" element={<Phases />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;
