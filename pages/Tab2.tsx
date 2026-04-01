import { IonContent, IonFab, IonFabButton, IonHeader, IonIcon, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab2.css';
import { globe, searchCircle } from 'ionicons/icons';

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
          <IonSearchbar color="tertiary" placeholder="Search by Location..."></IonSearchbar>
        </IonFab>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton href="tab3" color="tertiary" translucent={true}>
            <IonIcon icon={globe} > </IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;
