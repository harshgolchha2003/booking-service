import { useEffect,useState } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
const Index = () => {
    const [places,setPlaces]=useState([]);
    useEffect(()=>{
        axios.get('/place-display').then(({data})=>{
            setPlaces(data);
        })
    },[])

    return ( 
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8 mt-8">
        {places.length>0 && places.map(place=>(
            <Link to={'/place/'+place._id} key={place}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
               {place.photos.length>0&& ( <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="" />)}
                </div>
                <h3 className="font-bold">{place.address}</h3>
                <h2 className="text-sm truncate ">{place.title}</h2>
                <div className="mt-1 ">
                   <span className="font-bold">{'$'+place.price}</span>  per night
                </div>
            </Link>
        ))}
        </div>
    );
}
 
export default Index;