import { useState,useEffect } from 'react';
import { useParams,Navigate } from 'react-router-dom';
import axios from 'axios';
import Perks from './Perk.jsx';
import Uploadphotos from './AddPhoto.jsx';
import AccountNavBar from './AccountNavBar.jsx';
const AddPlace = () => {
    const {id}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [description,setDescription]=useState('');
    const [photos,setPhotos]=useState([]);
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuest,setMaxGuest]=useState('');
    const [reDirect,setDirect]=useState(false);
    useEffect(()=>{
        if(!id)return;
        if(id){
            axios.get('/places/'+id).then(({data})=>{
                setTitle(data.title);
                setAddress(data.address);
                setDescription(data.description);
                setPhotos(data.photos);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuest(data.maxGuest);
            });
        }
    },[id]);
    const head=(title,desc)=>{
        return (
            <div>
                <h1 className='text-2xl mt-4'>{title}</h1>
                <p className='text-gray-500 text-sm'>{desc}</p>
            </div>
        )
    }

    const addNewPlace = async (ev) => {
        ev.preventDefault();
        const data = {
            title,
            address,
            photos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuest,
        };
    
        try {
            const { data: file } = await axios.post('/add-place', data);
            console.log(file);
            setDirect(true);
        } catch (error) {
            console.error('Error adding place:', error);
        }
    };
    

    if(reDirect) 
    {
       return(

           <Navigate to="/account/own"/>
       )
    }
    return (
        <>
        <AccountNavBar/>
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
        </>
      );
}
 
export default AddPlace;