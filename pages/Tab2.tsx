import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItemDivider, IonLabel, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { arrowForward, calendar, globe, searchCircle, settings } from 'ionicons/icons';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Home</IonTitle>
          </IonToolbar>
        </IonHeader>


        <IonFab vertical="top" horizontal="center" slot="fixed">
          <IonButton href="settings" color="tertiary" size="small">
            <IonIcon icon={settings}></IonIcon>
          </IonButton>

          <IonButton href="calendar" color="tertiary" size="small">
            <IonIcon icon={calendar}></IonIcon>
          </IonButton>
        
          <IonSearchbar color="tertiary" placeholder="Search by Location..."></IonSearchbar>
        </IonFab>

        <IonFab color="tertiary" vertical="bottom" horizontal="center" slot="fixed">
          <IonLabel><h1>Facility Services Building</h1></IonLabel>
          <IonLabel><p>Facility Services Building, Engineering Lane</p></IonLabel>
          <IonLabel><p>Baton Rouge, LA 70803</p></IonLabel>
          <IonButton href="tab3" color="tertiary">
            <IonLabel>More...</IonLabel>
            <IonIcon icon={arrowForward}> </IonIcon>
          </IonButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
