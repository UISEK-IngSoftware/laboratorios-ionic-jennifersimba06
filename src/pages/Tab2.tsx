import { 
  IonButton, 
  IonContent, 
  IonHeader, 
  IonInput, 
  IonPage, 
  IonText, 
  IonTextarea, 
  IonTitle, 
  IonToolbar, 
  useIonViewWillEnter 
} from '@ionic/react';
import './Tab2.css';
import { useHistory } from 'react-router';
import { createRepository, updateRepository } from '../services/GithubService';
import React from 'react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Repository } from '../interfaces/Repository';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");

  // Examen P2: Manejo de estados de los inputs de manera controlada
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  
  // Examen P2: Estado para discernir si estamos editando o creando
  const [isEditing, setIsEditing] = React.useState(false);
  const [originalRepo, setOriginalRepo] = React.useState<Repository | null>(null);

  useIonViewWillEnter(() => {
    setErrorMsg("");
    const locationState = history.location.state as { repoToEdit?: Repository } | undefined;

    if (locationState?.repoToEdit) {
      // Examen P2: Modo Edición
      const repo = locationState.repoToEdit;
      setIsEditing(true);
      setOriginalRepo(repo);
      setName(repo.name);
      setDescription(repo.description || "");
    } else {
      // Examen P2: Modo Creación
      setIsEditing(false);
      setOriginalRepo(null);
      setName("");
      setDescription("");
    }
  });

  const saveRepository = () => {
    if (name.trim() === '') {
      setErrorMsg('El nombre del repositorio es obligatorio.');
      return;
    }

    setLoading(true);
    const payload = { name, description };

    if (isEditing && originalRepo) {
      // Examen P2: Flujo de Actualización (PUT / PATCH)
      updateRepository(originalRepo.owner.login, originalRepo.name, payload)
        .then((updatedRepo) => {
          if (updatedRepo) {
            cleanFormAndRedirect();
          }
        })
        .catch((error) => {
          setErrorMsg("Error al actualizar repositorio: " + error.message);
        })
        .finally(() => setLoading(false));
    } else {
      // Examen P2: Flujo de Creación (POST)
      createRepository(payload)
        .then((newRepo) => {
          if (newRepo) {
            cleanFormAndRedirect();
          }
        })
        .catch((error) => {
          setErrorMsg("Error al crear repositorio: " + error.message);
        })
        .finally(() => setLoading(false));
    }
  };

  const cleanFormAndRedirect = () => {
    setName('');
    setDescription('');
    // Examen P2: Limpiar el estado del router 
    history.replace('/tab2', null);
    history.push('/tab1');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{isEditing ? 'Editar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{isEditing ? 'Editar Repositorio' : 'Formulario de Repositorio'}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            className="form-field"
            label="Nombre del repositorio"
            labelPlacement="floating"
            placeholder="Ingrese el nombre del repositorio"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)}
          />

          <IonTextarea
            className="form-field"
            label="Descripción"
            labelPlacement="floating"
            placeholder="Ingrese la descripción del repositorio"
            rows={5}
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />

          {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText>}
          
          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            onClick={saveRepository}
          >
            {isEditing ? 'Actualizar' : 'Guardar'}
          </IonButton>
        </div>
        <LoadingSpinner isOpen={loading}/>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
