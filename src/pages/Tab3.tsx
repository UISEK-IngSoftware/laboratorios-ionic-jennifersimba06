import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>


        <div className="card-container">
          <IonCard className="card">
            <img alt="Avatar" src="https://avatars.githubusercontent.com/u/48026030?v=4"/>
            <IonCardHeader>
              <IonCardTitle>Jennifer Simba</IonCardTitle>
              <IonCardSubtitle>jennifersimba05</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>Desarrollador web con conocimientos en backend y frontend.</p>
            </IonCardContent>
          </IonCard>
        </div>


      </IonContent>
    </IonPage>
  );
};

export default Tab3;
