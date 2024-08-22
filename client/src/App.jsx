import './App.css'
import {Routes,Route} from 'react-router-dom'
import axios from 'axios';
import {  UserContextProvider } from './pages/UserContext.jsx'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Layout from './pages/Layout.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/UserAccount.jsx'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
const App=()=> {

  return (
   <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account/:subpage?" element={<Account/>} />
      </Route>
    </Routes>
   </UserContextProvider>
    
  )
}

export default App;
