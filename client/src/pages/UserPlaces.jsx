import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import AccountNavBar from './AccountNavBar.jsx';
import axios from 'axios';
const Own = () => {
    const [places,setPlaces]=useState([]);
    useEffect(() =>{
       axios.get('/places').then(({data}) =>{
            setPlaces(data);
        })
    },
    [])

    return ( 
        <div>
            <AccountNavBar/>
                <div className="text-center">
                <Link className='inline-flex gap-1 bg-primary text-white rounded-full py-2 px-6 ' to={'/account/own/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
                Add new place
                </Link>
            </div>  
            <div>
                {places.length>0 && places.map(place=>(
                    <div key={place}>
                        <h3>{place.title}</h3>
                       
                    </div>
                ))}

            </div>   
        </div>
     );
}
 
export default Own;