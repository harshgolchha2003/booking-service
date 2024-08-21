import './App.css'
import {Routes,Route} from 'react-router-dom'
import Header from './pages/Header.jsx'
function App() {
  

  return (
   
    <Routes>
      <Route  index element={<Header/>}/>
    </Routes>
    
  )
}

export default App
