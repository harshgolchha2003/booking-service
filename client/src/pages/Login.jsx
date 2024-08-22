import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from 'axios';
import { useContext } from "react";
import { userContext } from "./UserContext.jsx";
const Login = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [reDirect,setReDirect]=useState(false);
    const {setUser}=useContext(userContext );

    const login=async(e)=>{
        e.preventDefault();
        try{ 
        const {data}= await axios.post('/login',{email,password});
        setUser(data);
        alert('Logged in successfully');
        setReDirect(true); 
        }
        catch(e){
            alert("Invalid credentials");
        }
     }
     if(reDirect)return <Navigate to={"/"}/>
    return ( 
        <div className="mt-4 grow flex items-center justify-around">
            <div className="">

                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto " onSubmit={login}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email-ID" />
                <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        <p>Not have an account? <Link to={"/register"} className="underline text-black ">Register Now</Link></p>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default Login;