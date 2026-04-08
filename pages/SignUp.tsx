import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SignUp.css';
import { arrowForward } from 'ionicons/icons';
import { useState } from 'react';
import PasswordField from './PasswordField';

const SignUp: React.FC = () => {

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
          <h1>Sign Up</h1>
        </IonLabel>

        <p>Enter a valid LSU email.</p>

        <IonInput 
          type="email" 
          color="tertiary" 
          label="University Email: " 
          placeholder="Enter your email" 
          fill="solid">
        </IonInput>
        
        <PasswordField/>

        <PasswordField/>
      
        <IonButton href="tab2" color="tertiary">
          <IonLabel>Sign Up: </IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default SignUp;