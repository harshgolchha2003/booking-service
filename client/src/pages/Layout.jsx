import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
    return (  
        <div className="py-4 px-6 flex flex-col min-h-screen">
        <NavBar/>
        <Outlet/>

        </div>
    );
}
 
export default Layout;