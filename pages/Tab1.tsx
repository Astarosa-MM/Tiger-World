import { IonButton, IonContent, IonFab, IonHeader, IonIcon, IonImg, IonInput, IonInputPasswordToggle, IonLabel, IonPage, IonTextarea, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { arrowForward, eye, lockClosed } from 'ionicons/icons';
import { useState } from 'react';


const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        
        <IonFab horizontal="center" vertical="top" slot="fixed">
          <IonThumbnail>
            <img alt="TigerWorld Logo" src="/src/photos/logonobg.png"></img>
          </IonThumbnail>
        </IonFab>
        
        
        <IonFab horizontal="center" vertical="center" slot="fixed">
          <div className="ion-margin">
          <IonLabel >
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
            <IonInputPasswordToggle color="tertiary" slot="end"></IonInputPasswordToggle>
          </IonInput>
      
          <IonButton href="tab2" color="tertiary">
            <IonLabel>Continue: </IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
          </IonButton>
        
          <IonButton routerLink="/sign-up" color="tertiary">
            <IonLabel>Sign Up: </IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
          </IonButton>
          </div>
        </IonFab>
        
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
