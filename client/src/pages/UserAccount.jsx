import axios  from "axios";
import { useContext,useState } from "react";
import { userContext } from "./UserContext.jsx";
import {  Navigate, useParams } from "react-router-dom";
import AccountNavBar from "./AccountNavBar.jsx";
import Own from './UserPlaces.jsx';

const Account = () => {
    const {ready,user,setUser}=useContext(userContext)
    const [reDirect,setRedirect]=useState(null);
    let {subpage}= useParams();
    if(subpage===undefined)subpage='profile';
    const logout=async()=>{
        
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if(!ready)
        return <div>Loading...</div>  
    

    if(reDirect)
        return (
    <Navigate to={reDirect}/>)

    if(ready && !user)
        return (
    <Navigate to={'/login'}/>)

 
    return ( 
        <div>
            <AccountNavBar/>
           {subpage==='profile'&&(
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email}) <br/>
                <button className="primary max-w-sm mt-2" onClick={logout}> Log out</button>
            </div>
           )}
           {subpage=='own'&&(
           <Own/>
           )}

        </div>
     );
}
 
export default Account;