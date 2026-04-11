import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
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

        <IonInput 
          type="email" 
          color="tertiary" 
          label="University Email: " 
          placeholder="Type here" 
          fill="solid">
        </IonInput>
        
        
        <IonInput type="password" color="tertiary" label="Password: " placeholder="Type here" fill="solid">
          <IonIcon slot="start" icon={lockClosed} aria-hidden="true"></IonIcon>
          <IonButton fill="clear" slot="end" aria-label="Show/hide">
            <IonIcon color="tertiary" slot="icon-only" icon={eye} aria-hidden="true"></IonIcon>
          </IonButton>
        </IonInput>
      
        <IonButton href="tab2" color="tertiary">
          <IonLabel>Login: </IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

        <IonButton routerLink="/sign-up" color="tertiary">
          <IonLabel>Sign Up: </IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab1;
