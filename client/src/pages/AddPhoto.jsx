import {useState} from 'react';
import axios from 'axios';

const Uploadphotos = ({photos,setPhotos}) => {
    const [photoLink,setPhotoLink]=useState('');
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
        <>
                    <div className='flex gap-2'>
                        <input type="text" placeholder={'add via link'} value={photoLink} onChange={(e)=>{setPhotoLink(e.target.value)}}  />
                        <button className='px-4 rounded-2xl' onClick={getByLink}>Upload from link</button>
                    </div>
                    
                    <div className='mt-2 grid gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6'>
                    {photos.length > 0 && photos.map(photo=>(
                        <div className='h-32 flex' key={photo}>
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
        </>
     );
}
 
export default Uploadphotos;