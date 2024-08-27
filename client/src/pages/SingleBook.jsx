import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom';
import {differenceInCalendarDays, format} from 'date-fns';
import axios from 'axios';
import PlacePhotos from './PlacePhotos.jsx';
const SingleBook = () => {
   const {id}=useParams();
   const [book,setBook]=useState(null);
   useEffect(()=>{
       if(id){
        axios.get('/user-booking').then(response=>{
            const found=response.data.find(({_id})=>id==_id);
            if(found){
                setBook(found);
            }
        });
       }
   },[id]);
   if(!book){
    return (' ');
   }
    return ( 
        <div className='my-8'>
        
        
            <h1 className='text-3xl '>{book.place.title}</h1>
            <a className='block font-semibold underline my-2' target="_blank" href={"https://maps.google.com/?q="+book.place.address}>{book.place.address}</a>
            <div className='bg-gray-200 rounded-2xl p-6 my-6'>
               <h2 className='text-xl'>Your booking information </h2>
               <div className='flex justify-between mt-2'>

                       <div className='text-xl flex gap-4'>
                           {differenceInCalendarDays(new Date(book.checkOut),new Date(book.checkIn))} nights 
                <div className=' border-gray-300 '>
                             {format(new Date(book.checkIn),'yyyy-MM-dd')} to {format(new Date(book.checkOut),'yyyy-MM-dd')} 
                       </div>
                        </div>    
               <div className='text-xl'>
                         Total Price:  ${book.price} 
                       </div>
                       </div>
                        
            </div>
                <PlacePhotos place={book.place}/>
            
        
        </div>
     );
}
 
export default SingleBook;