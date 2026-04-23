import { add, arrowForward, trash } from 'ionicons/icons';
import {IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonGrid, IonRow, IonCol, IonImg, IonButton, IonLabel, IonList, IonItem, IonInput, IonSelect, IonSelectOption, IonPopover, IonButtons, IonBackButton, IonAccordion, IonAccordionGroup,} from '@ionic/react';
import { usePhotoGallery } from '../hooks/useCamera';
import { useState } from 'react';
import { useHistory } from 'react-router';

const Test: React.FC = () => {
  const { photos, addNewToGallery, deletePhoto } = usePhotoGallery();
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [days, setDays] = useState<string[]>([]);
  const [mondayOpen, setMondayOpen] = useState('')
  const [mondayClose, setMondayClose] = useState('');
  const [tuesdayOpen, setTuesdayOpen] = useState('')
  const [tuesdayClose, setTuesdayClose] = useState('');
  const [wednesdayOpen, setWednesdayOpen] = useState('')
  const [wednesdayClose, setWednesdayClose] = useState('');
  const [thursdayOpen, setThursdayOpen] = useState('')
  const [thursdayClose, setThursdayClose] = useState('');
  const [fridayOpen, setFridayOpen] = useState('')
  const [fridayClose, setFridayClose] = useState('');
  const [saturdayOpen, setSaturdayOpen] = useState('')
  const [saturdayClose, setSaturdayClose] = useState('');
  const [sundayOpen, setSundayOpen] = useState('')
  const [sundayClose, setSundayClose] = useState('');

    const handleCreate = () => {
      const newBuilding = {
        name, days, address, phone, mondayOpen, mondayClose, tuesdayOpen, tuesdayClose, wednesdayOpen, wednesdayClose, thursdayOpen, thursdayClose, fridayOpen, fridayClose, saturdayOpen, saturdayClose, sundayOpen, sundayClose
      };

      localStorage.setItem('building', JSON.stringify(newBuilding));
      history.push('/tab3');
    };
  
    const history = useHistory();

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

        <IonInput color="tertiary" type="text" label="Edit Building Name: " value={name} fill="solid" onIonChange={e => setName(e.detail.value!)}></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Address: " value={address} fill="solid" onIonChange={e => setAddress(e.detail.value!)}></IonInput>
        <IonInput color="tertiary" type="url" label="Edit Website: " value=" " fill="solid"></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Phone Number:" value={phone} fill="solid" onIonChange={e => setPhone(e.detail.value!)}></IonInput>
        <IonInput color="tertiary" type="text" label="Edit Coordinates: " fill="solid"></IonInput>

        <IonSelect fill="solid" color="tertiary" label="Days of Operation: " multiple={true} value={days} onIonChange={e => setDays(e.detail.value)}>
          <IonSelectOption value="Monday">Monday</IonSelectOption>
          <IonSelectOption value="Tuesday">Tuesday</IonSelectOption>
          <IonSelectOption value="Wednesday">Wednesday</IonSelectOption>
          <IonSelectOption value="Thursday">Thursday</IonSelectOption>
          <IonSelectOption value="Friday">Friday</IonSelectOption>
          <IonSelectOption value="Saturday">Saturday</IonSelectOption>
          <IonSelectOption value="Sunday">Sunday</IonSelectOption>
        </IonSelect>

      {days.includes("Monday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Monday Opening:" type="time" value={mondayOpen} onIonChange={e => setMondayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Monday Closing:" type="time" value={mondayClose} onIonChange={e => setMondayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

      {days.includes("Tuesday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Tuesday Opening:" type="time" value={tuesdayOpen} onIonChange={e => setTuesdayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Tuesday Closing:" type="time" value={tuesdayClose} onIonChange={e => setTuesdayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}
     
      {days.includes("Wednesday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Wednesday Opening:" type="time" value={wednesdayOpen} onIonChange={e => setWednesdayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Wednesday Closing:" type="time" value={wednesdayClose} onIonChange={e => setWednesdayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

      {days.includes("Thursday") && (  
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Thursday Opening:" type="time" value={thursdayOpen} onIonChange={e => setThursdayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Thursday Closing:" type="time" value={thursdayClose} onIonChange={e => setThursdayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

      {days.includes("Friday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Friday Opening:" type="time" value={fridayOpen} onIonChange={e => setFridayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Friday Closing:" type="time" value={fridayClose} onIonChange={e => setFridayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

      {days.includes("Saturday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Saturday Opening:" type="time" value={saturdayOpen} onIonChange={e => setSaturdayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Saturday Closing:" type="time" value={saturdayClose} onIonChange={e => setSaturdayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

      {days.includes("Sunday") && (
        <IonList inset={true}>
          <IonInput color="tertiary" fill="solid" label="Sunday Opening:" type="time" value={sundayOpen} onIonChange={e => setSundayOpen(e.detail.value!)}></IonInput>
          <IonInput color="tertiary" fill="solid" label="Sunday Closing:" type="time" value={sundayClose} onIonChange={e => setSundayClose(e.detail.value!)}></IonInput>
        </IonList>
      )}

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

                    <IonButton color="danger" onClick={() => deletePhoto(photo)}>
                      <IonIcon icon={trash}></IonIcon>
                    </IonButton>
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>
          </IonItem>
        </IonList>

      <div className="ion-margin">
        <IonButton onClick={handleCreate} color="tertiary"> 
          <IonLabel>Submit</IonLabel>
          <IonIcon icon={arrowForward}></IonIcon>
        </IonButton>
      </div>

      </IonContent>
    </IonPage>
  );
};

export default Test;