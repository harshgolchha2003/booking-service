import axios  from "axios";
import { useContext,useState } from "react";
import { userContext } from "./UserContext.jsx";
import { Link, Navigate, useParams } from "react-router-dom";

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

    const classes=(type=null)=>{
        let the_class= 'py-2 px-6';
        if(subpage==type)the_class+=' bg-primary text-white rounded-full';
        return the_class;
    }
    return ( 
        <div>
           <nav className="w-full flex mt-8 gap-2 justify-center">
            <Link className={classes('profile')} to={'/account'}>My Account</Link>
            <Link className={classes('bookings')} to={'/account/bookings'}>My Bookings</Link>
            <Link className={classes('own')} to={'/account/own'}>My Accommodations</Link>
           </nav>
           {subpage==='profile'&&(
            <div className="text-center max-w-lg mx-auto">
                Logged in as {user.name} ({user.email}) <br/>
                <button className="primary max-w-sm mt-2" onClick={logout}> Log out</button>
            </div>
           )}
        </div>
     );
}
 
export default Account;