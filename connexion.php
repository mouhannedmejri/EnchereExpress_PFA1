<?php
// Paramètres de connexion
$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$nom_base = "auction_db";

// Connexion avec MySQLi
$connexion = mysqli_connect($serveur, $utilisateur, $mot_de_passe, $nom_base);

// Vérifier la connexion
if (!$connexion) {
    die("Erreur de connexion : " . mysqli_connect_error());
}

// Définir l'encodage UTF-8
mysqli_set_charset($connexion, "utf8");

echo "Connexion réussie !<br>";

// Insertion dans la table utilisateur
$sql = "INSERT INTO utilisateur (nom_et_prenom, email, mdp, telephone, adresseM, carte_identite_passport, engagement, num_carte_bancaire) 
        VALUES ('Jean Dupont', 'jean.dupont@example.com', 'motdepasse1', 33612345678, '123 Rue de Paris', 123456789012, TRUE, 1234567890123456)";

if (mysqli_query($connexion, $sql)) {
    echo "Insertion dans utilisateur réussie !<br>";
} else {
    echo "Erreur lors de l'insertion : " . mysqli_error($connexion) . "<br>";
}

// Exécuter une requête SELECT
$requete = "SELECT * FROM utilisateur";
$resultat = mysqli_query($connexion, $requete);

// Vérifier si la requête a réussi
if ($resultat) {
    // Afficher les résultats
    while ($row = mysqli_fetch_assoc($resultat)) {
        echo "ID: " . $row['id_utilisateur'] . 
             " - Nom et prénom: " . $row['nom_et_prenom'] . 
             " - Email: " . $row['email'] . 
             " - Mot de passe: " . $row['mdp'] . 
             " - Téléphone: " . $row['telephone'] . 
             " - Adresse: " . $row['adresseM'] . 
             " - Carte d'identité/Passeport: " . $row['carte_identite_passport'] . 
             " - Engagement: " . ($row['engagement'] ? 'Oui' : 'Non') . 
             " - Numéro carte bancaire: " . $row['num_carte_bancaire'] . "<br>";
    }
    // Libérer le résultat
    mysqli_free_result($resultat);
} else {
    echo "Erreur lors de la requête : " . mysqli_error($connexion) . "<br>";
}

// Fermer la connexion
mysqli_close($connexion);
?>