import axios from "axios";
import { Repository } from "../interfaces/Repository";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { GithubUser } from "../interfaces/GithubUser";
import AuthService from "./AuthService";

const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || "https://api.github.com";
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN;


const githubApiClient = axios.create({
    baseURL: GITHUB_API_URL,
    headers: {
        Authorization: AuthService.getAuthHeader() || "",
    },
});

export const fetchRepositories = async (): Promise<Repository[]> => {
    try {
        console.log("TOKEN:", GITHUB_API_TOKEN);
        console.log("API:", GITHUB_API_URL);
        const response = await githubApiClient.get("/user/repos", {
            params: {
                per_page: 100,
                sort: "created",
                direction: "desc",
                affiliation:"owner",
                t: Date.now()
            }
        });
        return response.data as Repository[];
    } catch (error) {
        throw new Error("Error obteniendo repositorios: " + error);  
    }

}

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
    try {
        const response = await githubApiClient.post("/user/repos", repository);
        return response.data as Repository;
    } catch (error) {
        throw new Error("Error obteniendo repositorios: " + error);
    }
};

// --- Examen P2: EDITAR (PUT / PATCH) ---
export const updateRepository = async (owner: string, repoName: string, repository: RepositoryPayload): Promise<Repository | null> => {
    try {
        const response = await githubApiClient.patch(`/repos/${owner}/${repoName}`, repository);
        return response.data as Repository;
    } catch (error) {
        throw new Error("Error al actualizar repositorio: " + error);
    }
};

// --- Examen P2: ELIMINAR (DELETE) ---
export const deleteRepository = async (owner: string, repoName: string): Promise<void> => {
    try {
        await githubApiClient.delete(`/repos/${owner}/${repoName}`);
    } catch (error) {
        throw new Error("Error al eliminar repositorio: " + error);
    }
};

export const getUserInfo = async (): Promise<GithubUser | null> => {
    try {
        const response = await githubApiClient.get("/user");
        return response.data as GithubUser;
    } catch (error) {
        throw new Error("Error obteniendo repositorios: " + error);
    }
};