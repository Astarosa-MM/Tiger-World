import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import './EditEvents.css';
import { arrowBack, arrowForward } from 'ionicons/icons';

const EditEvents: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Event</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Event</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="events" color="tertiary">
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Add Event:</h1></IonLabel>

        <IonInput
          color="tertiary"
          label="Enter Event Name: "
          placeholder="Type here"
          fill="solid"
        ></IonInput>

        <IonItem>
          <IonInput
            label="Enter Start Time: "
            color="tertiary"
            type="time"
          ></IonInput>
          <IonInput
            label="Enter End Time: "
            color="tertiary"
            type="time"
          ></IonInput>
        </IonItem>

        <IonInput
          color="tertiary"
          label="Enter Location: "
          placeholder="Type here"
          fill="solid"
        ></IonInput>

        <IonButton color="tertiary">
          <IonLabel>Enter</IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default EditEvents;
