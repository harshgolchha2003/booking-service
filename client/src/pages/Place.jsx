import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import axios from 'axios';
import BookingForm from './BookingForm.jsx';
import Display from './DisplayPhoto.jsx';
const Place = () => {
    const {id}=useParams();
    const [place,setPlace] = useState(null);
    const [show,setShow]=useState(false);
    useEffect(()=>{
      if(!id)return ;
      axios.get('/places/'+id).then(({data})=>{
        setPlace(data);
      })
    },[id])
    return (
       !place? <h1>Loading...</h1> :  (
       show?(<div className='absolute inset-0 bg-black text-white min-h-screen'>
            <div className='p-8 grid gap-4 bg-black'>
              <div>
                <h2 className='text-3xl mr-48'>photos of {place.title}</h2>
                <button onClick={()=>setShow(false)} className='fixed rounded-2xl right-14 hover:bg-primary '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                </button>
              </div>
              {place.photos.map(places=>(
                <div key={places}>
                  <img className="w-full" src={'http://localhost:4000/uploads/'+places}/>
                </div>
              ))}
            </div>
       </div>):(

         <div className='mt-4 bg-gray-100 -mx-8 px-8 pt-8'>
       
  <h1 className='text-3xl '>{place.title}</h1>
  <a className='block font-semibold underline my-2' target="_blank" href={"https://maps.google.com/?q="+place.address}>{place.address}</a>
  <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden">
    <div>
      <Display place={place} ind={0} className="aspect-square object-cover w-full h-full"/>
      
    </div>
    <div className='grid'>
    <Display place={place} ind={1} className="aspect-square object-cover w-full h-full"/>
      <div className="overflow-hidden">
        {place.photos?.[2] && (
          <div className="relative top-2">
            <Display place={place} ind={2} className="aspect-square object-cover w-full h-full"/>
            <button 
              className="absolute bottom-3 right-2 bg-primary text-white py-1 px-3 rounded-lg shadow-md"
              onClick={() => setShow(true)}
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  </div>

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
    )));
}
 
export default Place;