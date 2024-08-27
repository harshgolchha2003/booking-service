import {Link} from 'react-router-dom';
import { useEffect,useState } from 'react';
import {differenceInCalendarDays, format} from 'date-fns';
import AccountNavBar from './AccountNavBar.jsx';
import axios from 'axios';
import Display from './DisplayPhoto.jsx';
const Booking = () => {
    const [places,setPlaces]=useState([]);
    useEffect(() =>{
       axios.get('/user-booking').then(({data}) =>{
            setPlaces(data);
        })
    },
    [])
    return (  
        <div>
            <AccountNavBar/>
            <div className='mt-2 grid  gap-4 ' >
                {places?.length > 0 && places.map(placebooked=>(
                    <Link to={'/account/booking/'+placebooked._id} key={placebooked} className='flex bg-gray-100 gap-4 rounded-2xl overflow-hidden '>
                       <div className='w-48 '>
                       <Display place={placebooked.place}  className="aspect-square object-cover w-full h-full"/> 
                       
                       </div>

                       <div className='py-3 grow pr-3 '>
                       <h2 className='text-xl'>{placebooked.place.title}</h2>
                       <div className='border-t border-gray-300 mt-2 py-3'>
                             {format(new Date(placebooked.checkIn),'yyyy-MM-dd')} to {format(new Date(placebooked.checkOut),'yyyy-MM-dd')} 
                       </div>
                         <div className='text-xl'>
                           {differenceInCalendarDays(new Date(placebooked.checkOut),new Date(placebooked.checkIn))} nights | 
                         Total Price: ${placebooked.price}
                        </div>    
                       </div>
                </Link>
                ))}

            </div>   
        </div>
     );
}
 
export default Booking;