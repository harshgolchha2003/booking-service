import {Link, useLocation} from "react-router-dom";

const AccountNavBar = () => {
    const {pathname}=useLocation();
    let subpage=pathname.split("/")?.[2];
    if(subpage===undefined)subpage='profile';
    const classes=(type=null)=>{
        let the_class= 'inline-flex gap-1 py-2 px-6 rounded-2xl';
        if(subpage==type)the_class+=' bg-primary text-white rounded-full';
        else the_class+=' bg-gray-200';
        return the_class;
    }
    
    return ( 
        <nav className="w-full flex my-8 gap-2  justify-center">
        <Link className={classes('profile')} to={'/account'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
</svg>

        My Account
        </Link>

        <Link className={classes('bookings')} to={'/account/bookings'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
</svg>

        My Bookings
        </Link>
        <Link className={classes('own')} to={'/account/own'}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819" />
</svg>

        My Accommodations</Link>
       </nav>
     );
}
 
export default AccountNavBar;