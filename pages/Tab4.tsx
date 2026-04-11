import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab4.css';
import { arrowBack, arrowForward } from 'ionicons/icons';

const Tab4: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Rooms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Room list</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="tab3" color="tertiary"> 
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Inside: Facility Services Building</h1></IonLabel>

        <IonList inset={true}>
          <IonLabel><h1>Classrooms: </h1></IonLabel>

          <IonItem>
            <IonLabel>FS 101</IonLabel>
            <IonLabel><p>Availability: ???</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 102</IonLabel>
            <IonLabel><p>Availability: ???</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 103</IonLabel>
            <IonLabel><p>Availability: ???</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 104</IonLabel>
            <IonLabel><p>Availability: ???</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonLabel><h1>Offices:</h1></IonLabel>

          <IonItem>
            <IonLabel>FS 221</IonLabel>
            <IonLabel><p>Dr. Jane Smith</p></IonLabel>
            <IonLabel><p>Physics</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 222</IonLabel>
            <IonLabel><p>Instructor John Doe</p></IonLabel>
            <IonLabel><p>Music</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>

        <IonList inset={true}>
          <IonLabel><h1>Restrooms</h1></IonLabel>

          <IonItem>
            <IonLabel>FS 100</IonLabel>
            <IonLabel><p>Women's</p></IonLabel>
            <IonLabel><p>Status: Open</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 200</IonLabel>
            <IonLabel><p>Men's</p></IonLabel>
            <IonLabel><p>Status: Closed</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonLabel>FS 105</IonLabel>
            <IonLabel><p>Genderless</p></IonLabel>
            <IonLabel><p>Status: Open</p></IonLabel>
            <IonButton color="tertiary">
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default Tab4;