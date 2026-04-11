import { add, arrowBack, camera } from 'ionicons/icons';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButton, IonLabel, IonList, IonItem, IonInput, IonSelect, IonSelectOption,} from '@ionic/react';
import { usePhotoGallery } from '../hooks/useCamera';

const Tab2: React.FC = () => {
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
        
        <IonButton href="info" color="tertiary">
          <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Edit Building: </h1></IonLabel>

        <IonInput color="tertiary" type="text" label="Edit Building Name: " placeholder="Facility Services Building" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Address: " placeholder=" " fill="solid"></IonInput>
        <IonInput color="tertiary" type="url" label="Edit Website: " placeholder="lsu.edu" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Phone Number:" fill="solid"></IonInput>

        <IonList inset={true}>
          <IonLabel><h1>Add Room: </h1></IonLabel>
          <IonItem>
            <IonInput color="tertiary" type="number" label="Enter Room Number: "></IonInput>
          </IonItem>
          <IonItem>
            <IonSelect label="Room Type: " multiple={true} color="tertiary" fill="solid">
              <IonSelectOption value="Office">Office</IonSelectOption>
              <IonSelectOption value="Restroom">Restroom</IonSelectOption>
              <IonSelectOption value="Classroom">Classroom</IonSelectOption>
              <IonSelectOption value="Other">Other</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonSelect label="Restroom Type: " multiple={true} color="tertiary" fill="solid">
              <IonSelectOption value="Female">Women's</IonSelectOption>
              <IonSelectOption value="Male">Men's</IonSelectOption>
              <IonSelectOption value="Genderless">Genderless</IonSelectOption>
              <IonSelectOption value="Unspecified">Unspecified</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput color="tertiary" type="text" label="Office Occupant: " fill="solid"></IonInput>
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
                  <IonCol size="2" key={photo.filepath}>
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

export default Tab2;