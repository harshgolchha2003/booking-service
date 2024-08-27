import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import BookingForm from './BookingForm.jsx';
import PlacePhotos from './PlacePhotos.jsx';
const Place = () => {
    const {id}=useParams();
    const [place,setPlace] = useState(null);
    
    useEffect(()=>{
      if(!id)return ;
      axios.get('/places/'+id).then(({data})=>{
        setPlace(data);
      })
    },[id])
    
    return (
       !place? <h1>Loading...</h1> :(

         <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
       
  <h1 className='text-3xl '>{place.title}</h1>
  <a className='block font-semibold underline my-2' target="_blank" href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
  <PlacePhotos place={place} />

  <div className='mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr] '>

  <div>
  <div className='my-4'>
    <h2 className='font-semibold text-2xl'>Description</h2>
    {place.description}
  </div>
  Check-in: {place.checkIn}<br/>
  Check-out: {place.checkOut}<br/>
  Max-guests: {place.maxGuest}
  </div>
  <div>
    <BookingForm place={place}/>
  </div>
  </div>
  <div className='bg-white -mx-8 border-t p-8'>
  <div>
    <h2 className='font-semibold text-2xl'>Extra Info:</h2>
  </div>
  <div className='mb-4 mt-2 text-sm text-gray-700 leading-5'>
    {place.extraInfo}
  </div>
   </div>
  

</div> 
    ));
}
 
export default Place;