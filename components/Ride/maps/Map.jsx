import React, { useRef, useState, useEffect } from 'react';
import "./Map.css";
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import AnimationLocation from "../../../lotties/location.json";
import AnimationLottie1 from "../../../lotties/manbike.json";
import AnimationLottie3 from "../../../lotties/reserve1.json";
import AnimationLottie4 from "../../../lotties/car1.json";
import AnimationLottie from "../../../AnimationLottie";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { IconButton } from '@mui/material';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGlrc2hpdDIzMzJrIiwiYSI6ImNrd2RmZzZmeDI2bXAyb3BhZjF1NzE2dXUifQ.uO1S9-rLDi9Izo3vFVIgEg';

export default function Map() {
    const [change, setChange] = useState(false);
    useEffect(() => {
        console.log(change);
    }, [change]);
    

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(72.5029);
    const [lat, setLat] = useState(24.3691);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [72.5029,24.3691],
            zoom: 4,
        })
    },[]);

    useEffect(() => {
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });
    
    return (
        <>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container"  style={{ width: "100%", height: "100vh" ,zIndex:"0"}}/>
            <div className="map_modal">
                <div className="mapModal_navPr">
                    <div className="mapModal_nav">
                        <div className="secondlinePr">
                        <div className="secondline">Where we can <br/>pick you up?<br/>
                        <span style={{fontSize:"16px",fontWeight:"500"}}>Available in under 10 min</span></div>
                        <div className="secondline_lottie">
                        <AnimationLottie name={AnimationLocation} height={115} width={150}/>
                        </div>
                </div>
                    </div>
                </div>
                {(change)?(<><div className='action'>
                <div className='action_child' onClick={()=>setChange(false)}>
                <AnimationLottie name={AnimationLottie4} height={115} width={160}/>
                    <span>Car</span>
                </div>
                <div className='action_child' onClick={()=>setChange(false)}>
                <AnimationLottie name={AnimationLottie1} height={115} width={160}/>
                    <span>Bike</span>
                </div>
                <div className='action_child' onClick={()=>setChange(false)}>
                <AnimationLottie name={AnimationLottie3} height={115} width={160}/>
                    <span>Reserve</span>
                </div>
                </div>
                <div className='destination'>
                   <span>All at one place</span>
                </div>
                <div className='powered'>
                    <p style={{fontSize:"14px"}}>
                        Powered by <span style={{fontSize:"16px",fontWeight:"600"}}>Embargo</span>
                    </p>
                </div></>):(<>
                    <div className='sec_containerPr'>
                        <div className="backbutton">
                        <IconButton onClick={()=>setChange(true)}>
                            <KeyboardBackspaceIcon fontSize='large'/>
                        </IconButton>
                        </div>
                        <div className='sec_container'>
                        <div className="input">
                            <div className='circle'>
                            <img src='https://img.icons8.com/ios/50/9CA3AF/filled-circle.png' alt='circle'/>
                            </div>
                            <div className='line'>
                            <img src='https://img.icons8.com/ios/50/9CA3AF/vertical-line.png' alt='line'/>
                            </div>
                            <div className='square'>
                            <img src='https://img.icons8.com/windows/32/000000/square-full.png' alt='square'/>
                            </div>
                            </div>
                            <div className='type'>
                            <input type="text" placeholder='Enter pickup Location'/>
                            <input type="text" placeholder='Where to?'/>
                            </div>
                            </div>
                        <div className="savedPlaces">
                        <img src="https://img.icons8.com/material-outlined/24/000000/star--v2.png" alt="star"/>
                        <p>
                        Saved Places
                        </p>
                        </div>
                        <div className="confirmLocation">
                        <div className="confirm_button">
                            <a href='#/' text="confirm now" className='confirm'>
                                Confirm Locations
                            </a>
                            </div>
                        </div>
                    </div>
                </>)}
            </div>
            </>
    );
}