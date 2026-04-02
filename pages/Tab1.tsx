import { IonButton, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { arrowForward, eye, lockClosed } from 'ionicons/icons';
import { useState } from 'react';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Welcome</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Welcome</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonLabel>
          <h1>Log In</h1>
        </IonLabel>

        <IonTextarea color="tertiary" label="University Email:" placeholder="Type here" fill="solid"></IonTextarea>
        <IonTextarea color="tertiary" label="Password: " placeholder="Type here" fill="solid">
          <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
          <IonButton fill="clear" slot="end" aria-label="Show/hide">
            <IonIcon color="tertiary" slot="icon-only" icon={eye} aria-hidden="true"></IonIcon>
          </IonButton>
        </IonTextarea>
      
        <IonButton href="tab2" color="tertiary">
          <IonLabel>Continue: </IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
