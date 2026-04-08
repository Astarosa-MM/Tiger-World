import { IonButton, IonContent, IonHeader, IonIcon, IonicSlides, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import './Settings.css';
import { arrowBack, eye, pencil, pencilOutline, pencilSharp } from 'ionicons/icons';

const Settings: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="tab2" color="tertiary">
            <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Profile Settings</h1></IonLabel>
            <IonList>
                <IonItem>
                    <IonLabel>Email: </IonLabel>
                    <IonLabel><p>example123@lsu.edu</p></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Password </IonLabel>
                    <IonLabel><p>p********3</p></IonLabel>
                    <IonButton color="tertiary">
                        <IonIcon icon={eye}></IonIcon>
                    </IonButton>
                </IonItem>
                <IonItem>
                    <IonLabel>Permissions: </IonLabel>
                    <IonLabel><p>Can edit, vote, view</p></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Role: </IonLabel>
                    <IonLabel><p>Student</p></IonLabel>
                </IonItem>
                <IonItem>
                    <IonLabel>Dark Mode: </IonLabel>
                    <IonToggle color="tertiary" checked={true}></IonToggle>
                </IonItem>
                    <IonLabel><p>Account created January 1st, 1960.</p></IonLabel>
            </IonList>
      </IonContent>
    </IonPage>
  );
};


export default Settings;