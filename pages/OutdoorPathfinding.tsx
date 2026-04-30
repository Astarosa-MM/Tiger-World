import { IonButton, IonContent, IonFab, IonIcon, IonLabel, IonPage, IonPopover, IonSearchbar, IonFabButton } from '@ionic/react';
import { add, locateOutline, locationOutline } from 'ionicons/icons';
import './Tab2.css';
import { arrowForward, calendar, help, pencil, settings } from 'ionicons/icons';
import { APIProvider,  Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useLocation } from 'react-router';
import { Marker, MapMouseEvent, useMap, useMapsLibrary, Polyline } from '@vis.gl/react-google-maps';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Geolocation, Position } from '@capacitor/geolocation'


interface PathfindingProps {
    userPosition: {lat: number, lng: number};
}

type LatLng = {
  lat: number;
  lng: number;
}

function getDistance(a: LatLng, b:LatLng){
  const R = 6371e3;//meters
  const Phi1 = (a.lat * Math.PI) / 180;
  const Phi2 = (b.lat * Math.PI) / 180;
  const deltaPhi = ((b.lat - a.lat) * Math.PI) / 180;
  const deltaLambda = ((b.lng - a.lng) * Math.PI) / 180;

    const x =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(Phi1) *
    Math.cos(Phi2) *
    Math.sin(deltaLambda / 2) *
    Math.sin(deltaLambda / 2);

  const d = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

  return R * d;
}

const OutdoorPathfinding: React.FC<PathfindingProps> = ({userPosition}) => {

  const map = useMap();
  const geometry = useMapsLibrary("geometry");
  const lastFetchTime = useRef(0);

  const markerPos1 = {lat: 30.409662781123572, lng: -91.18212244303703};
  const markerPos2 = {lat: 30.410143928242466, lng: -91.17549202235222};

  const [position, setPosition] = useState({lat: 30.409662781123572, lng: -91.18212244303703});
  const [isPathButtonDisabled, setIsPathButtonDisabled] = useState(true);
  const [destination, setDestination] = useState(markerPos2);



  const [path, setPath] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);
  const [isRoutingStarted, setIsRoutingStarted] = useState(false);
  const [isLocationStarted, setIsLocationStarted] = useState(false);

  const [routeStrokeWeight, setRouteStrokeWeight] = useState(5);

  const lastReroutePoint = useRef<LatLng | null>(null);
  const watchId = useRef<string | null>(null);


  const handleRoutingStart = (e) => {
    setIsLocationStarted(true);
    setIsRoutingStarted(true);
    setRouteStrokeWeight(5);
    console.log("Routing Start");
  }




// useEffect (() => {
//   // console.log("use effect location");
//   // if(!isLocationStarted) return;
  
//   const getLocation = async  () => {
//         console.log("Getting Location");
//         try {
//         const coords = await Geolocation.getCurrentPosition();
//         setPosition({
//           lat: coords.coords.latitude,
//           lng: coords.coords.longitude,
//         });


//       } catch (err) {
//         console.error("Error getting location", err);
//       }
//   }
//   getLocation();

// }, [isLocationStarted])


  useEffect(() => {
    const startTracking = async () => {
      watchId.current = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
        },
        (pos: Position | null, err) => {
          if (err || !pos) return;

          const newPos = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };

          setPosition(newPos);
          console.log(position.lat + ", " + position.lng);
        }
      );
    };

    startTracking();

    return () => {
      if (watchId.current) {
        Geolocation.clearWatch({ id: watchId.current });
      }
    };
  }, [position]);



 useEffect(() => {

  if(!isRoutingStarted) return;
  if(!position || !destination) return;

      const shouldReroute = () => {
      if (!lastReroutePoint.current) return true;

      const dist = getDistance(userPosition, lastReroutePoint.current);
      console.log("Distance to last Route Point " + dist);
      return dist > 30; // 🔑 threshold (meters)
    };

      const distToDestination = getDistance(userPosition, destination);
      console.log("Distance: " + distToDestination);
      if(distToDestination < 25){ // (meters)
        setRouteStrokeWeight(0);
        setIsRoutingStarted(false);
        return ;
      }
    

    if(!shouldReroute()) return;
    lastReroutePoint.current = userPosition;


  //Throttle API so we don't go overboard with the calls
  if(Date.now() - lastFetchTime.current < 500) {console.log("Too many calls"); return;}
  lastFetchTime.current = Date.now();

  const getRoute = async () => {

    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "api key",
          "X-Goog-FieldMask":
            "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify({
          origin: {
            location: {
              latLng: { latitude: userPosition.lat, longitude: userPosition.lng },
            },
          },
          destination: {
            location: {
              latLng: { "latitude": destination.lat, "longitude": destination.lng },
            },
          },
          travelMode: "Walk",
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
}, [position, geometry, isRoutingStarted, destination, userPosition]);
   
  return (
        <>
              <Marker position={userPosition}></Marker>
              <Marker position={destination}></Marker>
              <Polyline 
                path={path}
                options={{
                strokeColor: "#9900ff",
                strokeWeight: 5,
                }}
              >
              </Polyline>

            <IonFab vertical="center" horizontal="end" slot="fixed">
            <IonFabButton onClick={handleRoutingStart}>
            <IonIcon icon={locationOutline}></IonIcon>
            <p>Path</p>
            </IonFabButton>
            </IonFab>
        </>
         
  );
};

export default OutdoorPathfinding;
