import {Link,useParams,Navigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Perks from './Perk.jsx';
import Uploadphotos from './AddPhoto.jsx';

const Own = () => {
    const {action}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [photos,setPhotos]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuest,setMaxGuest]=useState('');
    const [redirect,setRedirect]=useState('');
    const head=(title,desc)=>{
        return (
            <div>
                <h1 className='text-2xl mt-4'>{title}</h1>
                <p className='text-gray-500 text-sm'>{desc}</p>
            </div>
        )
    }

    const addNewPlace=async(ev)=>{
        ev.preventDefault();
        const data={
            title,
            address,
            description,
            photos,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuest
        }
        await axios.post('/addplace',data);
        setRedirect('/account/own');
    }
   
    if(redirect){
        return (
            <Navigate to={redirect}/>
        )
    }

    return ( 
        <div>
            {action!=='new'&&(

                <div className="text-center">
                
                <Link className='inline-flex gap-1 bg-primary text-white rounded-full py-2 px-6 ' to={'/account/own/new'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                Add new place
                </Link>
            </div>
            )}
            {action ==='new'&&(
                <div>
                <form onSubmit={addNewPlace}>
                    {head('Title',"title for your place should be short and catchy as in advertisment")}
                    <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    
                    {head('Address','Address to your place')}
                    <input type="text" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}  />

                    {head('Photos','More the merrier')}
                    <Uploadphotos photos={photos} setPhotos={setPhotos}/>

                    {head('Description','Details of the space')}
                    <textarea value={description} onChange={(e)=>{setDescription(e.target.value)}} />

                    {head('Perks','Select all that apply')}
                    <Perks selected={perks} onChange={setPerks}/>
                    
                    {head('Extra details','All that the tenant gotta know before renting')}
                    <textarea value={extraInfo} onChange={(e)=>{setExtraInfo(e.target.value)}} />

                    {head('Check-in & Check-out','dont forget to maintain the hygiene')}
                    <div className='grid gap-2 sm:grid-cols-3'>

                    <div>
                        <h3 className="mt-2 -mb-1">Check-In</h3>
                        <input type="text" placeholder='14:00' value={checkIn} onChange={(e)=>{setCheckIn(e.target.value)}}  />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Check-Out</h3>
                        <input type="text" placeholder='17:00' value={checkOut} onChange={(e)=>{setCheckOut(e.target.value)}}  />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1">Max-guests</h3>
                        <input type="number" placeholder='5' value={maxGuest} onChange={(e)=>{setMaxGuest(e.target.value)}}  />
                    </div>

                    </div>
                    
                        <button className='primary my-4'> Add Place</button>
                    
                </form>
                </div>
            )}
        </div>
     );
}
 
export default Own;