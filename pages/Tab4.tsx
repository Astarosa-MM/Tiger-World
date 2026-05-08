import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab4.css';
import { add, arrowForward, trash } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useIonViewWillEnter } from '@ionic/react';

const Tab4: React.FC = () => {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('rooms') || '[]');
    setRooms(stored);
  }, []);

  useIonViewWillEnter(() => {
    const stored = JSON.parse(localStorage.getItem('rooms') || '[]');
    setRooms(stored);
    });

  const deleteRoom = (indexToDelete: number) => {
    const updated = rooms.filter((_, index) => index !== indexToDelete);
    setRooms(updated);
    localStorage.setItem('rooms', JSON.stringify(updated));
  };

  const roomSorted = rooms.reduce((acc: any, room: any, originalIndex: number) => {
    const type = room.type || 'Other';
    if (!acc[type]) acc[type] = [];
    acc[type].push({ ...room, originalIndex });
    return acc;
  }, {});

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons color="tertiary" slot="start">
            <IonBackButton defaultHref="tab3"></IonBackButton>
          </IonButtons>
          <IonTitle>Inside: Patrick F. Taylor</IonTitle>
        </IonToolbar>
      </IonHeader>
    <IonContent fullscreen>

        {rooms.length === 0 ? (
          <IonItem>
            <IonLabel>There are no rooms added to this building.</IonLabel>
          </IonItem>
        ) : (
          Object.keys(roomSorted).map((type) => (
            <IonList key={type}>
              <IonListHeader>
                <IonLabel><h1>{type}</h1></IonLabel>
              </IonListHeader>

          {roomSorted[type].map((cls: any) => (
            <IonItem key={cls.originalIndex}>
              <IonLabel>
                <h2>PFT {cls.number}</h2>
                <p>{cls.occupant}</p>
                <p>{cls.department}</p>
                <p>{cls.restroom}</p>
              </IonLabel>

            <IonButton color="danger" slot="end" onClick={() => deleteRoom(cls.originalIndex)}>
              <IonIcon icon={trash}></IonIcon>
            </IonButton>
                </IonItem>
              ))}
            </IonList>
          ))
        )}

        <div className="ion-margin">
          <IonButton color="tertiary" href="AddRoom">
            <IonLabel>Add Room</IonLabel>
            <IonIcon icon={add} />
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab4;