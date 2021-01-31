const Locations = () => {
    const [selectedPosition, setSelectedPosition] = React.useState([0,0]);

    return (
      <MapView selectedPosition={selectedPosition} setSelectedPosition={setSelectedPosition} />
    )
    
}

import {MapContainer, Marker,TileLayer,Popup, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'   


const MapView = ({selectedPosition,setSelectedPosition}) =>{
    

    const Markers = () => {
    
        const map = useMapEvents({
            click(e) {                                
                setSelectedPosition([
                    e.latlng.lat,
                    e.latlng.lng
                ]);              
            },            
        })
    
        return (
            selectedPosition ? 
                <Marker           
                key={selectedPosition[0]}
                position={selectedPosition}
                interactive={false} 
                />
            : null
        )   
        
    }

    

    return <MapContainer center={selectedPosition} zoom={5}   
                         
            style={{height:"200px",width:"500px"}}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
         ></TileLayer>
         <Markers />
    </MapContainer>
}

export default MapView