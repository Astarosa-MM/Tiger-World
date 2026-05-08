import { IonBackButton, IonButton, IonButtons, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import './AddBuilding.css';
import { add, arrowBack, arrowForward } from 'ionicons/icons';
import { useState } from 'react';
import { usePhotoGallery } from '../hooks/useCamera';

const AddBuilding: React.FC = () => {
  const { photos, addNewToGallery } = usePhotoGallery();
  const [campusName, setCampusName] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/insert/campus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          campus_name: campusName
        })
      });

      const data = await res.json();
      console.log("Created:", data);
    } catch (err) {
      console.error("Error:", err);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="tab2"></IonBackButton>
          </IonButtons>
          <IonTitle>Create Building: </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        <IonInput color="tertiary" type="text" label="Campus: " value={campusName} onIonChange={e => setCampusName(e.detail.value!)} fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Building Name: " value="" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Address: " value="" fill="solid"></IonInput>
        <IonInput color="tertiary" type="url" label="Website: " value="" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Phone Number:" value="" fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Coordinates: " value="" fill="solid"></IonInput>
 
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

        <div className="ion-margins"> 
        <IonButton onClick={handleSubmit} color="tertiary">
            <IonLabel>Create </IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>
        </div>

      </IonContent>
    </IonPage>
  );
};

export default AddBuilding;
        