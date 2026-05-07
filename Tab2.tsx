import { IonButton, IonContent, IonFab, IonIcon, IonItem, IonItemDivider, IonLabel, IonList, IonPage, IonPopover, IonSearchbar, IonSegment } from '@ionic/react';
import './Tab2.css';
import { arrowForward, calendar, help, pencil, settings } from 'ionicons/icons';
import { APIProvider,  Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useHistory, useLocation } from 'react-router';
import { Marker, ControlPosition } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';
import { Building } from './types';

const Tab2: React.FC = () => {
  const location = useLocation<any>();
  const selected = location.state;
  const history = useHistory();
  const selectingLocation = location.state?.selectingLocation;
  
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [selectedBuilding, setSelectedBuilding] = useState<Building | null>(null);
  
  const [expanded, setExpanded] = useState(false);
  const [mapReady, setMapReady] = useState(false);

  const [searchText, setSearchText] = useState('');

  const filteredBuildings = buildings.filter(b =>
    b.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/buildings");
        const data = await res.json();

        const normalized: Building[] = data.buildings.map((b: any) => ({
          id: b.building_ID,
          name: b.building_name,
          address: b.address,
          phone: b.phone,
          lat: b.lat,
          lng: b.lng,
          days: b.days,

          mondayOpen: b.monday_open,
          mondayClose: b.monday_close,
          tuesdayOpen: b.tuesday_open,
          tuesdayClose: b.tuesday_close,
          wednesdayOpen: b.wednesday_open,
          wednesdayClose: b.wednesday_close,
          thursdayOpen: b.thursday_open,
          thursdayClose: b.thursday_close,
          fridayOpen: b.friday_open,
          fridayClose: b.friday_close,
          saturdayOpen: b.saturday_open,
          saturdayClose: b.saturday_close,
          sundayOpen: b.sunday_open,
          sundayClose: b.sunday_close,
        }));
        setBuildings(normalized);
      } catch (err) {
        console.error("Failed to fetch buildings:", err);
      }
    };

  fetchBuildings();
}, []);

  const handleSelectBuilding = (b: Building) => {
    setSelectedBuilding(b);
  };

  return (
    <IonPage>
      <IonContent fullscreen>

        <IonFab vertical="top" horizontal="center" slot="fixed">
          <IonSearchbar
            color="tertiary"
            placeholder="Search by Location..."
            value={searchText}
            onIonInput={(e) => setSearchText(e.detail.value!)}
            onIonClear={() => setSearchText('')}
          />
          {searchText && filteredBuildings.length > 0 && (
            <IonList className="search-dropdown">
              {filteredBuildings.map(b => (
                <IonItem
                  key={b.id}
                  button
                  onClick={() => {
                    setSelectedBuilding(b);
                    setSearchText('');
                  }}
                >
                  <IonLabel>{b.name}</IonLabel>
                </IonItem>
              ))}
            </IonList>
          )}
          
          <IonButton href="settings" color="tertiary" size="small">
            <IonIcon icon={settings}></IonIcon>
          </IonButton>

          <IonButton href="calendar" color="tertiary" size="small">
            <IonIcon icon={calendar}></IonIcon>
          </IonButton>

          <IonButton href="addbuilding" color="tertiary" size="small">
            <IonIcon icon={pencil}></IonIcon>
          </IonButton>
          
          <IonButton id="click-trigger" color="tertiary" size="small">
            <IonIcon icon={help}></IonIcon>
          </IonButton>

          <IonPopover trigger="click-trigger" triggerAction="click">
            <IonContent class="ion-padding">Click on an item on the map to see a preview, then select "See Inside..." to see additional information. You can also use the search bar to search for an item or add an event using the calendar.</IonContent>
          </IonPopover>
        </IonFab>
      
        <APIProvider apiKey={' Place Key here '} onLoad={() => setMapReady(true)}>
          <Map
            defaultZoom={18}
            options={{
              zoomControl: true,
              zoomControlOptions: {
                position: ControlPosition.RIGHT_CENTER
              },
              mapTypeCOntrol: false,
              streetViewControl: false,
              fullscreenControl: false,
              rotateControl: false
            }}
            center={
              selectedBuilding
                ? {
                  lat: Number(selectedBuilding.lat),
                  lng: Number(selectedBuilding.lng)
                }
                : { lat: 30.406266, lng: -91.184324 }
              }
            onClick={(e) => {
              if (!selectingLocation || !e.detail.latLng) return;

              const lat = e.detail.latLng.lat;
              const lng = e.detail.latLng.lng;

              history.push('/addbuilding', { lat, lng });
            }}
          >
            {buildings.length > 0 && buildings.map((b) => (
              <Marker
                key={b.id}
                position={{
                  lat: Number(b.lat),
                  lng: Number(b.lng)
                }}
                onClick={() => handleSelectBuilding(b)}
              />
            ))}
          </Map>
        </APIProvider>
         
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            {selectedBuilding && (
              <div className={`fab-card ${expanded ? 'expanded' : ''}`}>
                <IonButton color="tertiary" fill="clear" size="small" onClick={() => setExpanded(prev => !prev)}>
                  <IonLabel>{expanded ? 'Show Less' : 'Show More'}</IonLabel>
                </IonButton>
                <IonLabel><h1>{selectedBuilding.name}</h1></IonLabel>
                  <IonLabel><p>{selectedBuilding.address}</p></IonLabel>
                  <IonLabel><p>Phone: {selectedBuilding.phone}</p></IonLabel>
                  <IonList inset={false}>
                    <div className="ion-margin">
                    <IonLabel> Hours: </IonLabel>
                      <IonLabel><p>Mon: {selectedBuilding?.mondayOpen} - {selectedBuilding?.mondayClose}</p></IonLabel>
                      <IonLabel><p>Tues: {selectedBuilding?.tuesdayOpen} - {selectedBuilding?.tuesdayClose}</p></IonLabel>
                      <IonLabel><p>Wed: {selectedBuilding?.wednesdayOpen}- {selectedBuilding?.wednesdayClose}</p></IonLabel>
                      <IonLabel><p>Thurs: {selectedBuilding?.thursdayOpen}- {selectedBuilding?.thursdayClose}</p></IonLabel>
                      <IonLabel><p>Fri: {selectedBuilding?.fridayOpen}- {selectedBuilding?.fridayClose}</p></IonLabel>
                      <IonLabel><p>Sat: {selectedBuilding?.saturdayOpen}- {selectedBuilding?.saturdayClose}</p></IonLabel>
                      <IonLabel><p>Sun: {selectedBuilding?.sundayOpen}- {selectedBuilding?.sundayClose}</p></IonLabel>
                    </div>
                  </IonList>
                <IonButton
                  onClick={() => history.push('/tab4', { building: selectedBuilding })}
                  color="tertiary"
                >
                <IonLabel>See Inside...</IonLabel>
                <IonIcon icon={arrowForward}></IonIcon>
              </IonButton>
            </div>
          )}
          </IonFab>


      </IonContent>
    </IonPage>
  );
};

export default Tab2;
