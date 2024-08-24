import './App.css'
import {Routes,Route} from 'react-router-dom'
import axios from 'axios';
import {  UserContextProvider } from './pages/UserContext.jsx'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Layout from './pages/Layout.jsx'
import Register from './pages/Register.jsx'
import Account from './pages/UserAccount.jsx'
import Own from './pages/UserPlaces.jsx';
import AddPlace from './pages/AddPlace.jsx';
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
      <Route path="/account" element={<Account/>} />
      <Route path="/account/own" element={<Own/>} />
      <Route path="/account/own/new" element={<AddPlace/>} />
      </Route>
    </Routes>
   </UserContextProvider>
    
  )
}

export default App;
