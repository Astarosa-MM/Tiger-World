import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonLabel, IonPage, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './SignUp.css';
import { arrowForward } from 'ionicons/icons';
import { useState } from 'react';
import PasswordField from './PasswordField';
import CopyPasswordField from './CopyPasswordField';

const SignUp: React.FC = () => {
  //remember to clear passwords when switching pages
  const [passwordInvalidText, setPasswordInvalidText] = useState("");
  const [password, setPassword] = useState("");

  const handlePassordFieldChange = (val: string) =>{
    setPassword(val);
    //At Least 6 Characters with at least one alphabet, one digit, and one special character
    const passwordTest =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{6,}$/;
    if(passwordTest.test(val)){
      setPasswordInvalidText("");
    }
    else{
      setPasswordInvalidText("Password needs to be 6 characters with 1 letter, 1 digit, and one special character.");
    }
  }
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
        <p className="password-invalid">{passwordInvalidText}</p>
        <IonInput 
          type="email" 
          color="tertiary" 
          label="University Email: " 
          placeholder="Enter your email" 
          fill="solid">
        </IonInput>
        
        <PasswordField onPasswordFieldChange={handlePassordFieldChange}/>

        <CopyPasswordField/>
      
        <IonButton href="tab2" color="tertiary">
          <IonLabel>Sign Up: </IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default SignUp;