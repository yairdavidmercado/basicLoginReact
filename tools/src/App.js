
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import Welcome from './features/auth/Welcome'
import RequireAuth from './features/auth/RequireAuth'
import UsersList from './features/users/usersList'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        {/*Public routes */}
        <Route index element={<Public/>}/>
        <Route path='login' element={<Login/>}/>

        {/*Protected routes */}
        <Route element={<RequireAuth/>}>
          <Route path='welcome' element={<Welcome/>}/>
          <Route path='usersList' element={<UsersList/>}/>
        </Route>
      </Route>

    </Routes>
  )
}

export default App;
