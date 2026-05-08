import { IonButton, IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonItemDivider, IonLabel, IonPage, IonPopover, IonSearchbar, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { arrowForward, calendar, globe, help, pencil, searchCircle, settings } from 'ionicons/icons';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>

        <IonFab vertical="top" horizontal="center" slot="fixed">
          <IonSearchbar color="tertiary" placeholder="Search by Location..."></IonSearchbar>
          
          <IonButton href="settings" color="tertiary" size="small">
            <IonIcon icon={settings}></IonIcon>
          </IonButton>

          <IonButton href="calendar" color="tertiary" size="small">
            <IonIcon icon={calendar}></IonIcon>
          </IonButton>

          <IonButton href="addbuilding" color="tertiary" size="small">
            <IonIcon icon={pencil}></IonIcon>
          </IonButton>
          
          <IonButton id="click-trigger" color="tertiary" size="small">
            <IonIcon icon={help}></IonIcon>
          </IonButton>

          <IonPopover trigger="click-trigger" triggerAction="click">
            <IonContent class="ion-padding">Click on an item on the map to see a preview, then select "more" to see additional information. You can also use the search bar to search for an item or add an event using the calendar.</IonContent>
          </IonPopover>

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
