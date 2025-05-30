import axios from 'axios';

const API_URL = 'http://localhost/auction_api/api.php';

// Article Interface
export interface Article {
    id_article: number;
    titre: string;
    description: string;
    prix_initial: number;
    date_debut: string;
    image: string;
    prix_attendu: number;
    categorie: string;
    status_article: string;
    id_utilisateur: number;
}

// Enchere Interface
export interface Enchere {
    id_enchere: number;
    prix_enchere: number;
    date_enchere: string;
    heure_enchere: string;
    id_utilisateur: number;
    id_article?: number;
}

// Utilisateur Interface
export interface Utilisateur {
    id_utilisateur: number;
    nom_et_prenom: string;
    email: string;
    mdp: string;
    telephone: number;
    adresseM: string;
    carte_identite_passport: number;
    engagement: boolean;
    num_carte_bancaire: number;
}

// Articles
export const getArticles = async (): Promise<Article[]> => {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data;
};

export const getArticlesByUser = async (id_utilisateur: number): Promise<Article[]> => {
    const response = await axios.get(`${API_URL}/articles`);
    return response.data.filter((article: Article) => article.id_utilisateur === id_utilisateur);
};

export const createArticle = async (article: Omit<Article, 'id_article'>): Promise<{ message: string; id: number }> => {
    const response = await axios.post(`${API_URL}/articles`, article);
    return response.data;
};

// Enchere
export const createEnchere = async (enchere: Omit<Enchere, 'id_enchere'>): Promise<{ message: string; id: number }> => {
    const response = await axios.post(`${API_URL}/enchere`, enchere);
    return response.data;
};

// Utilisateur
export const registerUser = async (user: Omit<Utilisateur, 'id_utilisateur'>): Promise<{ message: string; id: number }> => {
    const response = await axios.post(`${API_URL}/utilisateur`, user);
    return response.data;
};

export const loginUser = async (email: string, mdp: string): Promise<Utilisateur> => {
    const response = await axios.get(`${API_URL}/utilisateur`);
    const users = response.data;
    const user = users.find((u: Utilisateur) => u.email === email && u.mdp === mdp);
    if (!user) throw new Error('Invalid email or password');
    return user;
};

// Favorites
export const addFavorite = async (id_utilisateur: number, id_article: number): Promise<{ message: string }> => {
    const response = await axios.post(`${API_URL}/favorise`, { id_utilisateur, id_article });
    return response.data;
};

export const getFavorites = async (id_utilisateur: number): Promise<{ id_utilisateur: number; id_article: number }[]> => {
    const response = await axios.get(`${API_URL}/favorise/${id_utilisateur}`);
    return response.data;
};

export const removeFavorite = async (id_utilisateur: number, id_article: number): Promise<{ message: string }> => {
    const response = await axios.delete(`${API_URL}/favorise`, { data: { id_utilisateur, id_article } });
    return response.data;
};