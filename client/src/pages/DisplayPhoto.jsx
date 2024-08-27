/* eslint-disable react/prop-types */
const Display = ({place,ind=0,className=null}) => {
    if(place.photos.length<=ind){
        return ' ';
    }
    if(!className) {
        className='object-cover';
    }
    return ( 
        <>
            <img className={className} src={'http://localhost:4000/uploads/'+place.photos[ind]}/>
        
        </>
     );
}
 
export default Display;