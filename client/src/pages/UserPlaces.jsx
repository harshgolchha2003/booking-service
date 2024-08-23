import {Link,useParams} from 'react-router-dom';
import { useState } from 'react';
import Perks from './Perk.jsx';
import axios from 'axios';

const Own = () => {
    const {action}=useParams();
    const [title,setTitle]=useState('');
    const [address,setAddress]=useState('');
    const [photoLink,setPhotoLink]=useState('');
    const [photos,setPhotos]=useState([]);
    const [description,setDescription]=useState('');
    const [perks,setPerks]=useState([]);
    const [extraInfo,setExtraInfo]=useState('');
    const [checkIn,setCheckIn]=useState('');
    const [checkOut,setCheckOut]=useState('');
    const [maxGuest,setMaxGuest]=useState('');
    const head=(title,desc)=>{
        return (
            <div>
                <h1 className='text-2xl mt-4'>{title}</h1>
                <p className='text-gray-500 text-sm'>{desc}</p>
            </div>
        )
    }
    const getByLink=async(ev) =>{
        ev.preventDefault();
      const {data:filename}=await axios.post('/upload-by-link',{link:photoLink})
      setPhotos(prev=>{
          return [...prev,filename];
        });
      setPhotoLink('');
    
    }

    const uploadPhoto=async(ev) =>{
        const files=ev.target.files;
        const data=new FormData();
        for (let i=0;i<files.length;i++){
            data.append('photos',files[i]);
        }
       const {data:filenames}=await  axios.post('/upload',data,{
            headers:{'Content-Type':'multipart/form-data'}
        });
        setPhotos(prev=>{
            return [...prev,...filenames];
          });

     
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
                <form>
                    {head('Title',"title for your place should be short and catchy as in advertisment")}
                    <input type="text" placeholder="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} />
                    
                    {head('Address','Address to your place')}
                    <input type="text" placeholder="address" value={address} onChange={(e)=>{setAddress(e.target.value)}}  />

                    {head('Photos','More the merrier')}
                    <div className='flex gap-2'>
                        <input type="text" placeholder={'add via link'} value={photoLink} onChange={(e)=>{setPhotoLink(e.target.value)}}  />
                        <button className='px-4 rounded-2xl' onClick={getByLink}>Upload from link</button>
                    </div>
                    
                    <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {photos.length > 0 && photos.map(photo=>(
                        <div className='h-32 flex '>
                           <img className='rounded-2xl w-full object-cover' src={'http://localhost:4000/uploads/'+photo} alt="" />
                        </div>
                    ))}
                        <label className='h-32 cursor-pointer flex items-center border bg-transparent rounded-2xl p-2 text-2xl text-gray-600 flex justify-center gap-1'>
                        <input type="file" multiple className='hidden' onChange={uploadPhoto} />
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                            </svg>
                        Upload
                        </label>
                    </div>

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