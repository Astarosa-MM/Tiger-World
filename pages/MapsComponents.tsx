import { IonButton, IonContent, IonFab, IonIcon, IonLabel, IonPage, IonPopover, IonSearchbar, IonFabButton } from '@ionic/react';
import { add } from 'ionicons/icons';
import './Tab2.css';
import { arrowForward, calendar, help, pencil, settings } from 'ionicons/icons';
import { APIProvider,  Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useLocation } from 'react-router';
import { Marker, MapMouseEvent, useMap, useMapsLibrary, Polyline } from '@vis.gl/react-google-maps';
import { useEffect, useState, useCallback } from 'react';
import { Geolocation } from '@capacitor/geolocation'

interface PathfindingProps {
    position: {lat: number, lng: number}
}

const OutsidePathfinding: React.FC = () => {

  const map = useMap();
  const geometry = useMapsLibrary("geometry");


  const markerPos1 = {lat: 30.409662781123572, lng: -91.18212244303703};
  const markerPos2 = {lat: 30.410143928242466, lng: -91.17549202235222};
  const [position, setPosition] = useState({lat: 30.409662781123572, lng: -91.18212244303703});

  //const [polyline, setPolyline] = useState(null);


  const [path, setPath] = useState([]);
  const [routeInfo, setRouteInfo] = useState(null);

  const getRoute = useCallback(async () => {
    getLocation();
    console.log(position);
    const response = await fetch(
      "https://routes.googleapis.com/directions/v2:computeRoutes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": "api here",
          "X-Goog-FieldMask":
            "routes.distanceMeters,routes.duration,routes.polyline.encodedPolyline",
        },
        body: JSON.stringify({
          origin: {
            location: {
              latLng: { "latitude": 30.409662781123572, "longitude": -91.18212244303703 },
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
  }, [map, geometry]);

  
  const getLocation = useCallback(async () => {
    try {
        const coords = await Geolocation.getCurrentPosition();
        setPosition({
          lat: coords.coords.latitude,
          lng: coords.coords.longitude,
        });
        console.log("current lat: " + coords.coords.latitude);
        console.log("current lng: " + coords.coords.longitude);
      } catch (err) {
        console.error("Error getting location", err);
      }
    }, []);


  return (
        <>
              <Marker position={markerPos1}></Marker>
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
            <IonFabButton onClick={getRoute}>
            <IonIcon icon={add}></IonIcon>
            </IonFabButton>
            </IonFab>
        </>
         
  );
};

export default OutsidePathfinding;
