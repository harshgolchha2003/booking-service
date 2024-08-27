/* eslint-disable react/prop-types */
import Display from './DisplayPhoto.jsx';
import { useState } from 'react';
const PlacePhotos = ({place}) => {
    const [show,setShow]=useState(false);
    if(show){
        return (<div className='absolute inset-0 bg-black text-white min-h-screen'>
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
       </div>)
    }
    return ( 
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
     );
}
 
export default PlacePhotos;