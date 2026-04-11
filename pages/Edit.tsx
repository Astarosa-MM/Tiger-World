import { IonButton, IonContent, IonDatetime, IonFab, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTextarea, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Edit.css';
import { arrowBack, arrowForward, eye, lockClosed } from 'ionicons/icons';
import { useState } from 'react';

const Edit: React.FC = () => {
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

        <IonInput color="tertiary" label="Enter Class Title: " placeholder="Type here" fill="solid"></IonInput>

        <IonSelect label="Enter Class Days: " multiple={true} color="tertiary" fill="solid">
            <IonSelectOption value="Monday">Monday</IonSelectOption>
            <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
            <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
            <IonSelectOption value="Thursday">Thursday</IonSelectOption>
            <IonSelectOption value="Friday">Friday</IonSelectOption>
            <IonSelectOption value="Saturday">Saturday</IonSelectOption>
            <IonSelectOption value="Sunday">Sunday</IonSelectOption>
        </IonSelect>

        <IonItem>
          <IonInput label="Enter Start Time: " color="tertiary" type="time"><span slot="title">Enter Start Time:</span></IonInput>
          <IonInput label="Enter End Time: " color="tertiary" type="time"><span slot="title">Enter End Time:</span></IonInput>
        </IonItem>

        <IonTextarea color="tertiary" label="Enter Address: " placeholder="Type here" fill="solid"></IonTextarea>
        <IonTextarea color="tertiary" label="Enter Room Number " placeholder="Type here" fill="solid"></IonTextarea>

        <IonButton color="tertiary">
            <IonLabel>Enter</IonLabel>
            <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>

      </IonContent>
    </IonPage>
  );
};

export default Edit;
