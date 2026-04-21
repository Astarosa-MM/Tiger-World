import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonFabButton, IonFabList, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';
import { arrowBack, arrowForward, link } from 'ionicons/icons';
import { usePhotoGallery } from '../hooks/useCamera';

const Tab3: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="tab2"></IonBackButton>
          </IonButtons>
          <IonTitle>More...</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="ion-margin">
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

          <IonList inset={false}>
            <div className="ion-margin"><IonLabel> <h1> Find a Room: </h1> </IonLabel></div>
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

          <IonList inset={false}>
            <div className="ion-margin"><IonLabel> <h1> Hours: </h1> </IonLabel></div>
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
            <div className="ion-margin"><IonLabel><h1> Photos: </h1></IonLabel></div>
            <IonGrid>
              <IonRow>
                {photos.map((photo) => (
                    <IonCol size="5" key={photo.filepath}>
                      <IonImg src={photo.webviewPath} />
                    </IonCol>
                ))}
              </IonRow>
            </IonGrid>
            
          </IonList>

          <IonButton href="tab2" color="tertiary">
            <IonLabel>Get directions</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>  
          </IonButton>

          <IonButton color="tertiary">
            <IonLabel>Is this correct? Make an edit</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
          </IonButton>
          </div>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;
