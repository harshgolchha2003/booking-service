/* eslint-disable react/prop-types */
import { useState } from "react";
import {Navigate} from 'react-router-dom';
import {differenceInCalendarDays} from "date-fns";
import axios from 'axios';
const BookingForm = ({place}) => {
  const [checkIn,setCheckIn] = useState('');
  const [checkOut,setCheckOut] = useState('');
  const [guest,setGuest] = useState(null);
  const [name,setName] = useState(null);
  const [phone,setPhone] = useState(null);
  const [reDirect,setReDirect] = useState(null);
  let duration=0;
  if(checkIn&& checkOut){
    duration=differenceInCalendarDays(new Date(checkOut),new Date(checkIn));
  }
  const bookPlace=async()=>{
    if(guest>place.maxGuest||!guest||!name||!phone){
      alert('Please fill all the required fields correctly');
      return;
    }
    const dataSend={checkIn,checkOut,guest,name,phone,place:place._id,price:duration*place.price,guests:guest}
    
    alert(`Total price: $${duration*place.price}`);
    try{
     const {data}= await axios.post('/booking',dataSend);
      setReDirect('/account/bookings/'+data._id);
      alert('Booking successful');
    }
    catch(e){
      alert('Failed to book the place. Please try again later',e);
    }
   
  }
  if(reDirect) return <Navigate to={reDirect} />;
  return ( 
        <div className='bg-white shadow p-4 rounded-2xl '>
        <div className='text-2xl text-center'>
        Price: ${place.price} / night
        </div>
        <div className='border rounded-2xl mt-4'>
        <div className='flex'>
    
        <div className=' px-4 py-3 '>
          <label >Check-In</label>
          <input type="date" onChange={(e)=>setCheckIn(e.target.value)} value={checkIn} />
        </div>
          <div className=' px-4 py-3 border-l'>
          <label >Check-Out</label>
          <input type="date" onChange={(e)=>setCheckOut(e.target.value)} value={checkOut} />
          </div>
        </div>
        <div className=' px-4 py-3 border-t '>
          <label >No. of Guests: </label>
          <input type="number" onChange={(e)=>setGuest(e.target.value)} value={guest} />
          </div>
          {duration>0 && (
            <div >
           <div className=' px-4 py-3 border-t'>
           <label >Your Name:</label>
           <input type="text" onChange={(e)=>setName(e.target.value)} value={name} />
        </div>
        <div className=' px-4 py-3 border-t'>
             <label >Your Phone Number:</label>
             <input type="tel" onChange={(e)=>setPhone(e.target.value)} value={phone} />
              </div>
              </div>
          )}
        </div>
        <button onClick={bookPlace} className="primary mt-4">Book
          {duration>0 && (<span> ${(duration)*(place.price)}</span>)}
        </button>
      </div>  
     );
}
 
export default BookingForm;