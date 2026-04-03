import { IonBackButton, IonButton, IonButtons, IonContent, IonFab, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Calendar.css';
import { add, arrowBack, arrowForward, arrowForwardCircle, calendar } from 'ionicons/icons';

const Calendar: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Calendar</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Calendar</IonTitle>
          </IonToolbar>
        </IonHeader>

            <IonButton href="tab2" color="tertiary">
                <IonIcon icon={arrowBack}></IonIcon>
            </IonButton>
       
            <IonButton color="tertiary" >
                <IonIcon icon={add}></IonIcon>
                <IonLabel>Add Class</IonLabel>
            </IonButton>
              <IonLabel><h1>Your Schedule: </h1></IonLabel>
              
            <IonList>
                <IonItem>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel>CSC 4444 Artificial Intelligence</IonLabel>
                    <IonLabel><p>Mon/Wed 4:30-6pm </p></IonLabel>
                    <IonLabel><p>PFT 1202</p></IonLabel>
                    <IonButton color="tertiary">
                        <IonLabel>Go</IonLabel>
                        <IonIcon icon={arrowForward}></IonIcon>
                    </IonButton>
                </IonItem>
                
                <IonItem>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel>CSC 4330 Software Systems Development</IonLabel>
                    <IonLabel><p>Mon/Wed 12-1:30pm</p></IonLabel>
                    <IonLabel><p>PFT 1221</p></IonLabel>
                    <IonButton color="tertiary">
                        <IonLabel>Go</IonLabel>
                        <IonIcon icon={arrowForward}></IonIcon>
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel>MATH 1552 Calculus 2</IonLabel>
                    <IonLabel><p>Tues/Thurs 1-3pm</p></IonLabel>
                    <IonLabel><p>Coates 150</p></IonLabel>
                    <IonButton color="tertiary">
                        <IonLabel>Go</IonLabel>
                        <IonIcon icon={arrowForward}></IonIcon>
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel>HNRS 2402 Classical Civilization</IonLabel>
                    <IonLabel><p>Tues/Thurs 3:30-5pm</p></IonLabel>
                    <IonLabel><p>French House 218</p></IonLabel>
                    <IonButton color="tertiary">
                        <IonLabel>Go</IonLabel>
                        <IonIcon icon={arrowForward}></IonIcon>
                    </IonButton>
                </IonItem>

                <IonItem>
                    <IonIcon icon={calendar}></IonIcon>
                    <IonLabel>Bio 1001 Intro to Biology</IonLabel>
                    <IonLabel><p>Mon/Wed/Fri 9:30-10:30am</p></IonLabel>
                    <IonLabel><p>LS 121</p></IonLabel>
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

export default Calendar;