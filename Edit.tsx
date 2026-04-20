import { IonButton, IonContent, IonDatetime, IonFab, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import './Edit.css';
import { arrowBack, arrowForward, eye, lockClosed } from 'ionicons/icons';
import { useState } from 'react';

const Edit: React.FC = () => {
  const [campusName, setCampusName] = useState("");
  const [className, setClassName] = useState("");
  const [classDays, setClassDays] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [buildingName, setBuildingName] = useState("");
  const [RoomNumber, setRoomNumber] = useState("");

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

    try {
      const res = await fetch("http://localhost:3000/api/insert/building", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          buildingName: buildingName
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
          <IonTitle>Add Class</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Add Class</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonButton href="calendar" color="tertiary">
            <IonIcon icon={arrowBack}></IonIcon>
        </IonButton>

        <IonLabel><h1>Add Class: </h1></IonLabel>

        <IonInput color="tertiary" label="Campus Name: " value={campusName} onIonChange={e => setCampusName(e.detail.value!)}></IonInput>

        <IonInput color="tertiary" label="Enter Class Title: " value={className} placeholder="Type here" fill="solid" onIonChange={e => setClassName(e.detail.value!)}></IonInput>

        <IonSelect label="Enter Class Days: " multiple={true} color="tertiary" value={classDays} fill="solid" onIonChange={e => setClassDays(e.detail.value!)}>
            <IonSelectOption value="Monday">Monday</IonSelectOption>
            <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
            <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
            <IonSelectOption value="Thursday">Thursday</IonSelectOption>
            <IonSelectOption value="Friday">Friday</IonSelectOption>
            <IonSelectOption value="Saturday">Saturday</IonSelectOption>
            <IonSelectOption value="Sunday">Sunday</IonSelectOption>
        </IonSelect>

        <IonItem>
          <IonInput label="Start Time: " color="tertiary" type="time"><span slot="title">Enter Start Time:</span></IonInput>
          <IonInput label="End Time: " color="tertiary" type="time"><span slot="title">Enter End Time:</span></IonInput>
        </IonItem>

        <IonInput color="tertiary" label="Enter Building: " placeholder="Type here" value={buildingName} fill="solid" onIonChange={e => setBuildingName(e.detail.value!)}></IonInput>
        <IonInput color="tertiary" label="Enter Room Number: " placeholder="Type here" value={RoomNumber} fill="solid" onIonChange={e => setRoomNumber(e.detail.value!)}></IonInput>

        <IonButton onClick={handleSubmit} color="tertiary">
            <IonLabel>Enter</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Edit;
