import { IonContent, IonHeader, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonText, IonTitle, IonToolbar, useIonAlert, useIonViewWillEnter } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';
import { Repository } from '../interfaces/Repository';
import React from 'react';
import { deleteRepository, fetchRepositories } from '../services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHistory } from 'react-router';
import { pencilOutline, trashOutline } from 'ionicons/icons';

const Tab1: React.FC = () => {
  const [repos, setRepos] = React.useState<Repository[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const history = useHistory();
  const [presentAlert] = useIonAlert();

  
  
  const loadRepositories = async () => {
    setLoading(true);
    fetchRepositories()
      .then((reposData) => setRepos(reposData))
      .catch((error) => setErrorMsg(error.message))
      .finally(() =>setLoading(false));
  };

  
  
  useIonViewWillEnter(() => {
    loadRepositories();
  });

  // Examen P2: Manejo de la redirección al formulario pasándole el estado
  const handleEdit = (repo: Repository) => {
    history.push({
      pathname: '/tab2',
      state: { repoToEdit: repo }
    });
  };

  // Examen P2: Confirmación mediante un ion-alert 
  const handleDeleteConfirm = (repo: Repository) => {
    presentAlert({
      header: 'Confirmación',
      message: `¿Estás seguro de que deseas eliminar el repositorio "${repo.name}"? Esta acción no se puede deshacer.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            setLoading(true);
            deleteRepository(repo.owner.login, repo.name)
              .then(() => {
                loadRepositories();
              })
              .catch((error) => {
                setErrorMsg(error.message);
                setLoading(false);
              });
          }
        }
      ]
    });
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        {errorMsg !== "" && <IonText color="danger"><p>{errorMsg}</p></IonText>}
        {!loading && repos.length > 0 && (

          <IonList>
    {repos.map((repo) => (
      <IonItemSliding key={repo.id}>
        
        <RepoItem {...repo} />

        <IonItemOptions side="end">
          <IonItemOption 
            color="warning" 
            onClick={(e) => {
              const slidingItem = (e.target as HTMLElement).closest('ion-item-sliding');
              if (slidingItem) slidingItem.close(); 
              handleEdit(repo);
            }}
          >
            <IonIcon icon={pencilOutline} slot="icon-only" />
          </IonItemOption>
          
          <IonItemOption 
            color="danger" 
            onClick={(e) => {
              const slidingItem = (e.target as HTMLElement).closest('ion-item-sliding');
              if (slidingItem) slidingItem.close(); 
              handleDeleteConfirm(repo); 
            }}
          >
            <IonIcon icon={trashOutline} slot="icon-only" />
          </IonItemOption>
        </IonItemOptions>

      </IonItemSliding>
    ))}
  </IonList>
)}
        <LoadingSpinner isOpen={loading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;