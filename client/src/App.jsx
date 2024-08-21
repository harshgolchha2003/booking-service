import './App.css'
import {Routes,Route} from 'react-router-dom'
import Index from './pages/Index.jsx'
import Login from './pages/Login.jsx'
import Layout from './pages/Layout.jsx'
import Register from './pages/Register.jsx'
const App=()=> {
  

  return (
   
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route  index element={<Index/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Route>
    </Routes>
    
  )
}

export default App;
