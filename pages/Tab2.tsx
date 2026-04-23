import { IonButton, IonContent, IonFab, IonIcon, IonLabel, IonPage, IonPopover, IonSearchbar } from '@ionic/react';
import './Tab2.css';
import { arrowForward, calendar, help, pencil, settings } from 'ionicons/icons';
import { APIProvider,  Map, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { useLocation } from 'react-router';
import { Marker } from '@vis.gl/react-google-maps';
import { useEffect, useState } from 'react';



const Tab2: React.FC = () => {
  const location = useLocation<any>();
  const selected = location.state;
  const [selectedBuilding, setSelectedBuilding] = useState<any>(null);
  
  useEffect(() => {
    if (selected) {
      setSelectedBuilding(selected);
    }
  }, [selected]);

  return (
    <IonPage>
      <IonContent fullscreen>

        <IonFab vertical="top" horizontal="center" slot="fixed">
          <IonSearchbar color="tertiary" placeholder="Search by Location..."></IonSearchbar>
          
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
            <IonContent class="ion-padding">Click on an item on the map to see a preview, then select "more" to see additional information. You can also use the search bar to search for an item or add an event using the calendar.</IonContent>
          </IonPopover>
        </IonFab>
      
        <APIProvider apiKey={' withheld for privacy '} onLoad={() => console.log('Maps API Loaded')}>
          <Map
            defaultZoom={18}
            center={
              selected
                ? { lat: selected.lat, lng: selected.lng }
                : { lat: 30.406266, lng: -91.184324 }
              }
            >
              {selectedBuilding?.lat && selectedBuilding?.lng && (
                <Marker
                  position={{
                    lat: selectedBuilding.lat,
                    lng: selectedBuilding.lng
                  }}
                  draggable={true}
                  onDragEnd={(e) => {
                    setSelectedBuilding({
                      ...selectedBuilding,
                      lat: e.latLng!.lat(),
                      lng: e.latLng!.lng()
                    });
                  }}
                />
              )}
            </Map>
        </APIProvider>
         
          <IonFab vertical="bottom" horizontal="center" slot="fixed">
            <div className="fab-card">
              <IonLabel><h1>{selectedBuilding?.name}</h1></IonLabel>
              <IonLabel><p>{selectedBuilding?.address}</p></IonLabel>
              <IonLabel><p>Baton Rouge, LA 70803</p></IonLabel>
              <IonButton href="tab3" color="tertiary">
                <IonLabel>More...</IonLabel>
                <IonIcon icon={arrowForward}> </IonIcon>
              </IonButton>
            </div>
          </IonFab>


      </IonContent>
    </IonPage>
  );
};

export default Tab2;
