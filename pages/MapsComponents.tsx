import { IonButton, IonContent, IonFab, IonIcon, IonLabel, IonPage, IonPopover, IonSearchbar, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import './Tab2.css';
import { arrowForward, calendar, help, pencil, settings } from 'ionicons/icons';
import { APIProvider,  Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useLocation } from 'react-router';
import { Marker, MapMouseEvent, useMap, useMapsLibrary, Polyline } from '@vis.gl/react-google-maps';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Geolocation } from '@capacitor/geolocation'


interface PathfindingProps {
    position: {lat: number, lng: number}
}

const OutsidePathfinding: React.FC = () => {

  const map = useMap();
  const geometry = useMapsLibrary("geometry");
  const lastFetchTime = useRef(0);

  const markerPos1 = {lat: 30.409662781123572, lng: -91.18212244303703};
  const markerPos2 = {lat: 30.410143928242466, lng: -91.17549202235222};
  const [position, setPosition] = useState({lat: 30.409662781123572, lng: -91.18212244303703});

  //const [polyline, setPolyline] = useState(null);


  const [path, setPath] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isRoutingStarted, setIsRoutingStarted] = useState(false);
  const [isLocationStarted, setIsLocationStarted] = useState(false);

  const handleRoutingStart = (e) => {
    setIsLocationStarted(true);
    setIsRoutingStarted(true);
    console.log("Routing Start");
  }


    // const getLocation = useCallback(async () => {
    // try {
    //     const coords = await Geolocation.getCurrentPosition();
    //     setPosition({
    //       lat: coords.coords.latitude,
    //       lng: coords.coords.longitude,
    //     });
    //   } catch (err) {
    //     console.error("Error getting location", err);
    //   }
    // }, []);

useEffect (() => {
  // console.log("use effect location");
  // if(!isLocationStarted) return;
  
  const getLocation = async  () => {
        console.log("Getting Location");
        try {
        const coords = await Geolocation.getCurrentPosition();
        setPosition({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });


      } catch (err) {
        console.error("Error getting location", err);
      }
  }
  getLocation();

}, [isLocationStarted])


 useEffect(() => {

  if(!isRoutingStarted) return;
  //Throttle API so we don't go overboard with the calls
  if(Date.now() - lastFetchTime.current < 5000) {console.log("Too many calls wait a few seconds"); return;}
  lastFetchTime.current = Date.now();

  const getRoute = async () => {

    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "AIzaSyBEt2zDtjYZ9PKc1E4oEti5o4_2mDBiPsI",
          "X-Goog-FieldMask":
            "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify({
          origin: {
            location: {
              latLng: { latitude: position.lat, longitude: position.lng },
            },
          },
          destination: {
            location: {
              latLng: { "latitude": 30.410143928242466, "longitude": -91.17549202235222 },
            },
          },
          travelMode: "DRIVE",
        }),
      }
    );

    const data = await response.json();
    const route = data.routes[0];

    console.log(route);
    console.log(route.polyline.encodedPolyline);

    // Decode polyline
    
    const decodedPath = geometry.encoding.decodePath(
      route.polyline.encodedPolyline
    );

    // Convert to plain lat/lng objects
    const pathCoords = decodedPath.map((point) => ({
      lat: point.lat(),
      lng: point.lng(),
    }));

    setPath(pathCoords);
    setRouteInfo({
      distance: route.distanceMeters,
      duration: route.duration,
    });


  }
  getRoute();
  setIsRoutingStarted(false);
}, [position, geometry, isRoutingStarted]);
   

  //   const getRoute = useEffect(async () => {
  //   console.log(position);
  //   getLocation();
  //   console.log(position);
  //   const response = await fetch(
  //     "https://routes.googleapis.com/directions/v2:computeRoutes",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Goog-Api-Key": "AIzaSyBEt2zDtjYZ9PKc1E4oEti5o4_2mDBiPsI",
  //         "X-Goog-FieldMask":
  //           "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
  //       },
  //       body: JSON.stringify({
  //         origin: {
  //           location: {
  //             latLng: { latitude: 30.409662781123572, longitude: -91.18212244303703 },
  //           },
  //         },
  //         destination: {
  //           location: {
  //             latLng: { "latitude": 30.410143928242466, "longitude": -91.17549202235222 },
  //           },
  //         },
  //         travelMode: "DRIVE",
  //       }),
  //     }
  //   );

  //   const data = await response.json();
  //   const route = data.routes[0];

  //   console.log(route);
  //   console.log(route.polyline.encodedPolyline);

  //   // Decode polyline
  //   const decodedPath = geometry.encoding.decodePath(
  //     route.polyline.encodedPolyline
  //   );

  //   // Convert to plain lat/lng objects
  //   const pathCoords = decodedPath.map((point) => ({
  //     lat: point.lat(),
  //     lng: point.lng(),
  //   }));

  //   setPath(pathCoords);
  //   setRouteInfo({
  //     distance: route.distanceMeters,
  //     duration: route.duration,
  //   });
  // }, [map, geometry]);


  


  return (
        <>
              <Marker position={position}></Marker>
              <Marker position={markerPos2}></Marker>
              <Polyline 
                path={path}
                options={{
                strokeColor: "#4285F4",
                strokeWeight: 5,
                }}
              >
              </Polyline>

            <IonFab vertical="center" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleRoutingStart}>
            <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            </IonFab>
        </>
         
  );
};

export default OutsidePathfinding;
