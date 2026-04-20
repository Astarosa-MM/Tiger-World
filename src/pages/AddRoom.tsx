import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import './AddRoom.css';
import { arrowBack, arrowForward } from 'ionicons/icons';
import { useState } from 'react';

const AddRoom: React.FC = () => {

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
            <IonBackButton defaultHref="/"></IonBackButton>
          </IonButtons>
          <IonTitle>Rooms</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Room list</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton color="tertiary" href="tab4">
            <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

                <IonList inset={false}>
                  <IonItem>
                    <IonLabel><h1>Add Room: </h1></IonLabel>
                  </IonItem>
                  <IonItem>
                    <IonInput color="tertiary" type="text" label="Campus: " value={campusName} onIonChange={e => setCampusName(e.detail.value!)}></IonInput>
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

        <IonButton onClick={handleSubmit} color="tertiary">
            <IonLabel>Create </IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>
                
      </IonContent>
    </IonPage>
  );
};

export default AddRoom;