import { Link } from "react-router-dom";
const Register = () => {
    return ( 
            <div className="mt-4 grow flex items-center justify-around">
                <div className="">
    
                    <h1 className="text-4xl text-center mb-4">Register</h1>
                    <form className="max-w-md mx-auto ">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email-ID" />
                        <input type="password" placeholder="password" />
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