import { IonButton, IonCol, IonContent, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { arrowBack, arrowForward, link } from 'ionicons/icons';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Info</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="tab2" color="tertiary">
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

          <IonLabel class="ion-text-wrap"> 
            <h1>Facility Services Building</h1> 
            <p>Facility Services Building, Engineering Lane</p> 
            <p>Baton Rouge, LA 70803</p> 
          </IonLabel>

          <IonItem>
            <IonLabel> <h1>Phone: </h1> <p>225-578-6964</p></IonLabel>
          </IonItem>

          <IonItem>
            <IonLabel> <h1>Website: </h1> </IonLabel>
            <IonButton href="lsu.edu" color="tertiary">
              <IonIcon icon={link}></IonIcon>
            </IonButton>
          </IonItem>

          <IonList inset={true}>
            <IonLabel> <h1> Find a Room: </h1> </IonLabel>
            <IonItem>
              <IonLabel><p>FS 101</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>FS 201</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>FS 203</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>FS 105</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>FS 221</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Look Inside...</p></IonLabel>
              <IonButton href="tab4" color="tertiary">
                <IonIcon icon={arrowForward}></IonIcon>
              </IonButton>
            </IonItem>
          </IonList>

          <IonList inset={true}>
            <IonLabel> <h1> Hours: </h1> </IonLabel>
            <IonItem>
              <IonLabel><p>Mon: 9 am - 5 pm</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Tues: 9 am - 5 pm</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Wed: 9 am - 5 pm</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Thurs: 9 am - 5 pm</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Fri: 9 am - 5 pm</p></IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel><p>Sat/Sun: Closed</p></IonLabel>
            </IonItem>
          </IonList> 

          <IonList>
          <IonLabel><h1> Photos: </h1></IonLabel>
            <IonGrid>
              <IonRow>
                <IonCol size="2">
                  <IonImg src="src\photos\Img_2026_03_07_17_22_53.jpg"></IonImg>
                </IonCol>
                <IonCol size="2">
                  <IonImg src="src\photos\markup_1000015354.jpg"></IonImg>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonList>

          <IonButton href="tab2" color="tertiary">
            <IonLabel>Get directions</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>  
          </IonButton>

          <IonButton href="test" color="tertiary">
            <IonLabel>Is this correct? Make an edit</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
          </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
