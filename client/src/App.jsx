import './App.css'
import {Routes,Route} from 'react-router-dom'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Layout from './pages/Layout.jsx'
import Register from './pages/Register.jsx'
import axios from 'axios';
import {  UserContextProvider } from './pages/UserContext.jsx'

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;
const App=()=> {

  return (
   <UserContextProvider>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route  index element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
   </UserContextProvider>
    
  )
}

export default App;
