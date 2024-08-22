import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const register=async(e)=>{
        e.preventDefault();
        
       try{
           await axios.post('/register',{name,email,password});

           alert('Successfully registered')
       }
       catch(e){
            if(e=="AxiosError: Request failed with status code 422")
                alert("Email exists");
           else alert("Try later");
       }
    }
    return ( 
            <div className="mt-4 grow flex items-center justify-around">
                <div className="">
    
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto " onSubmit={register}>
                        <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="Name" />
                        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email-ID" />
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" />
                        <button className="primary">Register</button>
                        <div className="text-center py-2 text-gray-500">
                            <p>Already have an account? <Link to={"/login"} className="underline text-black ">Login Now</Link></p>
                        </div>
                    </form>
                </div>
            </div>
         );
}
 
export default Register;