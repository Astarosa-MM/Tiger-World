import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './Events.css';
import { add, arrowBack, arrowForward, calendar } from 'ionicons/icons';

const Events: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Events</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Events</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="tab2" color="tertiary">
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonButton href="/edit-events" color="tertiary">
          <IonIcon icon={add}></IonIcon>
          <IonLabel>Add Event</IonLabel>
        </IonButton>

        <IonLabel>
          <h1>Upcoming Events:</h1>
        </IonLabel>

        <IonList>
          <IonItem>
            <IonIcon icon={calendar}></IonIcon>
            <IonLabel>Spring Career Fair</IonLabel>
            <IonLabel>
              <p>Friday 10:00am-2:00pm</p>
            </IonLabel>
            <IonLabel>
              <p>Student Union Ballroom</p>
            </IonLabel>
            <IonButton color="tertiary">
              <IonLabel>Go</IonLabel>
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={calendar}></IonIcon>
            <IonLabel>AI Club Meeting</IonLabel>
            <IonLabel>
              <p>Monday 5:30-6:30pm</p>
            </IonLabel>
            <IonLabel>
              <p>PFT 1200</p>
            </IonLabel>
            <IonButton color="tertiary">
              <IonLabel>Go</IonLabel>
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={calendar}></IonIcon>
            <IonLabel>Hackathon Kickoff</IonLabel>
            <IonLabel>
              <p>Saturday 9:00-11:00am</p>
            </IonLabel>
            <IonLabel>
              <p>Engineering Auditorium</p>
            </IonLabel>
            <IonButton color="tertiary">
              <IonLabel>Go</IonLabel>
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={calendar}></IonIcon>
            <IonLabel>Student Org Expo</IonLabel>
            <IonLabel>
              <p>Tuesday 1:00-4:00pm</p>
            </IonLabel>
            <IonLabel>
              <p>Quad</p>
            </IonLabel>
            <IonButton color="tertiary">
              <IonLabel>Go</IonLabel>
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>

          <IonItem>
            <IonIcon icon={calendar}></IonIcon>
            <IonLabel>Research Showcase</IonLabel>
            <IonLabel>
              <p>Wednesday 3:00-5:00pm</p>
            </IonLabel>
            <IonLabel>
              <p>Library Commons</p>
            </IonLabel>
            <IonButton color="tertiary">
              <IonLabel>Go</IonLabel>
              <IonIcon icon={arrowForward}></IonIcon>
            </IonButton>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Events;
