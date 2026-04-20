import { add, arrowBack, help } from 'ionicons/icons';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButton, IonLabel, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonPopover,} from '@ionic/react';
import { usePhotoGallery } from '../hooks/useCamera';
import { useState } from 'react';

const Test: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Photo Gallery</IonTitle>
          </IonToolbar>
        </IonHeader>
        
        <IonButton href="tab3" color="tertiary">
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Edit Building: </h1></IonLabel>

        <IonInput color="tertiary" type="text" label="Edit Building Name: " value="Facility Services Building" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Address: " value="Facility Services Building, Engineering Lane, Baton Rouge, LA 70803" fill="solid"></IonInput>
        <IonInput color="tertiary" type="url" label="Edit Website: " value="lsu.edu" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Phone Number:" value="225-578-6964" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Coordinates: " fill="solid"></IonInput>

        <IonList inset={true}>
          <IonItem>
            <IonLabel><h1>Add Room: </h1></IonLabel>
          </IonItem>
          <IonItem>
            <IonSelect label="Room Type: " multiple={false} color="tertiary">
              <IonSelectOption value="Office">Office</IonSelectOption>
              <IonSelectOption value="Restroom">Restroom</IonSelectOption>
              <IonSelectOption value="Classroom">Classroom</IonSelectOption>
              <IonSelectOption value="Laboratory">Laboratory</IonSelectOption>
              <IonSelectOption value="E/S">Elevator/Staircase</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput color="tertiary" type="number" label="Enter Room Number: "></IonInput>
          </IonItem>
          <IonItem>
            <IonInput color="tertiary" type="number" label="Enter Floor Number: "></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label="Restroom Type: " multiple={false} color="tertiary">
              <IonSelectOption value="Female">Women's</IonSelectOption>
              <IonSelectOption value="Male">Men's</IonSelectOption>
              <IonSelectOption value="Genderless">Genderless</IonSelectOption>
              <IonSelectOption value="Wheelchair Accessible">Wheelchair Accessible</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput color="tertiary" label="Department: " type="text"></IonInput>
          </IonItem>
          <IonItem>
            <IonInput color="tertiary" type="text" label="Office Occupant: "></IonInput>
          </IonItem>
        </IonList>
        
        <IonList inset={true}>
          <IonItem>
            <IonLabel> <h1>Add Photos: </h1> </IonLabel>
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

        <IonFab vertical="bottom" horizontal="center" slot="fixed">

        </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Test;