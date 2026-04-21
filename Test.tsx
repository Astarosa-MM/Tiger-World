import { add, arrowBack, arrowForward, help } from 'ionicons/icons';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButton, IonLabel, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonPopover, IonButtons, IonBackButton,} from '@ionic/react';
import { usePhotoGallery } from '../hooks/useCamera';
import { useState } from 'react';

const Test: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="tab3"></IonBackButton>
          </IonButtons>
          <IonTitle>Edit Building Details: </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonInput color="tertiary" type="text" label="Edit Building Name: " value="Facility Services Building" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Address: " value="Facility Services Building, Engineering Lane, Baton Rouge, LA 70803" fill="solid"></IonInput>
        <IonInput color="tertiary" type="url" label="Edit Website: " value="lsu.edu" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Phone Number:" value="225-578-6964" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Coordinates: " fill="solid"></IonInput>
        
        <IonList inset={false}>
          <IonItem>
            <IonLabel> Add Photos: </IonLabel>
              <IonButton color="tertiary" onClick={() => addNewToGallery()}>
                <IonIcon icon={add}></IonIcon>
              </IonButton>
          </IonItem>
          <IonItem>
            <IonGrid>
              <IonRow>
                {photos.map((photo) => (
                  <IonCol size="5" key={photo.filepath}>
                    <IonImg src={photo.webviewPath} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>

        <IonButton href="tab3" color="tertiary"> 
          <IonLabel>Submit</IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Test;