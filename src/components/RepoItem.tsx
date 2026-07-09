import { IonItem, IonLabel, IonThumbnail } from "@ionic/react";
import "./RepoItem.css";
import React from "react";
import { Repository } from "../interfaces/Repository";

const RepoItem: React.FC<Repository> = (repository) => {
    return (
        <IonItem lines="full">
            <IonThumbnail slot="start">
                <img alt={repository.name} src={repository.owner.avatar_url} />
            </IonThumbnail>
            <IonLabel>
                <h2>{repository.name}</h2>
                <p>{repository.description}</p>
                <p>Lenguaje: {repository.language || "No especificado"}</p>
            </IonLabel>
        </IonItem>
    );
};

export default RepoItem;