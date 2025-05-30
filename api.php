<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

$serveur = "localhost";
$utilisateur = "root";
$mot_de_passe = "";
$nom_base = "auction_db";

$connexion = mysqli_connect($serveur, $utilisateur, $mot_de_passe, $nom_base);
if (!$connexion) {
    http_response_code(500);
    echo json_encode(["error" => "Erreur de connexion : " . mysqli_connect_error()]);
    exit;
}
mysqli_set_charset($connexion, "utf8");

$response = [];

$requete_utilisateurs = "SELECT COUNT(*) as total_utilisateurs FROM utilisateur";
$resultat_utilisateurs = mysqli_query($connexion, $requete_utilisateurs);
if ($resultat_utilisateurs) {
    $row = mysqli_fetch_assoc($resultat_utilisateurs);
    $response['total_utilisateurs'] = (int)$row['total_utilisateurs'];
} else {
    $response['total_utilisateurs'] = 0;
}

$requete_encheres = "SELECT COUNT(*) as total_encheres FROM article WHERE status_article = 'active'";
$resultat_encheres = mysqli_query($connexion, $requete_encheres);
if ($resultat_encheres) {
    $row = mysqli_fetch_assoc($resultat_encheres);
    $response['total_encheres'] = (int)$row['total_encheres'];
} else {
    $response['total_encheres'] = 0;
}

$requete_revenus = "SELECT SUM(prix_enchere) as total_revenus FROM enchere WHERE date_enchere <= CURDATE()";
$resultat_revenus = mysqli_query($connexion, $requete_revenus);
if ($resultat_revenus) {
    $row = mysqli_fetch_assoc($resultat_revenus);
    $response['total_revenus'] = (float)$row['total_revenus'] ?: 0;
} else {
    $response['total_revenus'] = 0;
}

$requete_conversion = "SELECT (COUNT(DISTINCT id_utilisateur) / (SELECT COUNT(*) FROM utilisateur)) * 100 as taux_conversion FROM enchere";
$resultat_conversion = mysqli_query($connexion, $requete_conversion);
if ($resultat_conversion) {
    $row = mysqli_fetch_assoc($resultat_conversion);
    $response['taux_conversion'] = (float)$row['taux_conversion'] ?: 0;
} else {
    $response['taux_conversion'] = 0;
}

$requete_reclamations = "SELECT r.id_recl, r.demande, r.status_recl, r.probleme, u.nom_et_prenom 
                        FROM reclamation r 
                        JOIN utilisateur u ON r.id_utilisateur = u.id_utilisateur";
$resultat_reclamations = mysqli_query($connexion, $requete_reclamations);
$reclamations = [];
if ($resultat_reclamations) {
    while ($row = mysqli_fetch_assoc($resultat_reclamations)) {
        $reclamations[] = $row;
    }
}
$response['reclamations'] = $reclamations;



$requete_active = "SELECT COUNT(DISTINCT e.id_enchere) AS total_active
FROM enchere e
JOIN est_sur es ON e.id_enchere = es.id_enchere
JOIN article a ON es.id_article = a.id_article
WHERE e.id_utilisateur = 4
AND a.status_article = 'active';";
$resultat_active = mysqli_query($connexion, $requete_active);

if ($resultat_active) {
    $row = mysqli_fetch_assoc($resultat_active);
    $response['total_active'] = (int)$row['total_active'];
} else {
    $response['total_active'] = 0;
}

$requete_remporté = "SELECT COUNT(DISTINCT a.id_article) AS total_remporté
FROM article a
JOIN est_sur es ON a.id_article = es.id_article
JOIN enchere e ON es.id_enchere = e.id_enchere
WHERE e.id_utilisateur = 4
AND a.status_article = 'remporté';";
$resultat_remporté = mysqli_query($connexion, $requete_remporté);
if ($resultat_remporté) {
    $row = mysqli_fetch_assoc($resultat_remporté);
    $response['total_remporté'] = (int)$row['total_remporté'];
} else {
    $response['total_remporté'] = 0;
}

$requete_total = "SELECT COUNT(*) AS total
FROM  enchere 
WHERE id_utilisateur = 4";

$resultat_total = mysqli_query($connexion, $requete_total);
if ($resultat_total) {
    $row = mysqli_fetch_assoc($resultat_total);
    $response['total'] = (int)$row['total'];
} else {
    $response['total'] = 0;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'get_active_auctions') {
    $response = [];
    $id_utilisateur = 4; // Hardcoded for user 4, adjust as needed

    // Fetch active auctions for user 4
    $query = "SELECT 
                a.id_article AS id, 
                a.titre AS title, 
                a.photo AS image, 
                a.prix_initial AS currentPrice, 
                a.categorie AS category, 
                a.date_debut AS startTime, 
                DATE_ADD(a.date_debut, INTERVAL 30 DAY) AS endTime, 
                a.status_article AS status
              FROM enchere e
JOIN est_sur es ON e.id_enchere = es.id_enchere
JOIN article a ON es.id_article = a.id_article
              WHERE e.id_utilisateur = ? AND a.status_article = 'active'";
    $stmt = mysqli_prepare($connexion, $query);
    mysqli_stmt_bind_param($stmt, "i", $id_utilisateur);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $auctions = [];
    while ($row = mysqli_fetch_assoc($result)) {
        // Calculate timeLeft (simplified example)
        $endTime = new DateTime($row['endTime']);
        $now = new DateTime();
        $interval = $endTime->diff(targetObject: $now);
        $timeLeft = $interval->days > 0 ? "{$interval->days}j" : "{$interval->h}h {$interval->i}m";
        $row['timeLeft'] = $timeLeft;
        $auctions[] = $row;
    }
    mysqli_stmt_close($stmt);

    $query_won_list = "SELECT 
                a.id_article AS id, 
                a.titre AS title, 
                a.photo AS image, 
                a.prix_initial AS currentPrice, 
                a.categorie AS category, 
                a.date_debut AS startTime, 
                DATE_ADD(a.date_debut, INTERVAL 30 DAY) AS endTime, 
                a.status_article AS status
              FROM enchere e
JOIN est_sur es ON e.id_enchere = es.id_enchere
JOIN article a ON es.id_article = a.id_article
                      WHERE e.id_utilisateur = ? AND a.status_article = 'remporté'";
    $stmt_won_list = mysqli_prepare($connexion, $query_won_list);
    mysqli_stmt_bind_param($stmt_won_list, "i", $id_utilisateur);
    mysqli_stmt_execute($stmt_won_list);
    $result_won_list = mysqli_stmt_get_result($stmt_won_list);
    $won_auctions = [];
    while ($row = mysqli_fetch_assoc($result_won_list)) {
        $row['id'] = (string)$row['id']; // Cast to string
        $row['timeLeft'] ='0j';
        $won_auctions[] = $row;
    }
    mysqli_stmt_close($stmt_won_list);

    $query_submitted = "SELECT 
                        id_article AS id,
                        titre AS title,
                        photo AS image ,
                        prix_initial AS currentPrice,
                        categorie AS category,
                        date_debut AS startTime,
                        DATE_ADD(date_debut, INTERVAL 30 DAY) AS endTime,
                        status_article AS status
                      FROM article 
                      WHERE id_utilisateur = ?";
    $stmt_submitted = mysqli_prepare($connexion, $query_submitted);
    mysqli_stmt_bind_param($stmt_submitted, "i", $id_utilisateur);
    mysqli_stmt_execute($stmt_submitted);
    $result_submitted = mysqli_stmt_get_result($stmt_submitted);
    $submitted_auctions = [];
    while ($row = mysqli_fetch_assoc($result_submitted)) {
        $endTime = new DateTime($row['endTime']);
        $now = new DateTime();
        $interval = $endTime->diff($now);
        $timeLeft = $interval->d > 0 ? "{$interval->d}j" : "{$interval->h}h {$interval->i}m";
        $row['timeLeft'] = $timeLeft;
        $row['id'] = (string)$row['id'];
        $submitted_auctions[] = $row;
    }
    mysqli_stmt_close($stmt_submitted);

    $response['depose'] = $auctions;
    $response['won'] = $won_auctions;
    $response['submitted'] = $submitted_auctions;

    echo json_encode($response);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'submit_article') {
    $response = ['success' => false, 'error' => null];

    error_log("Received submit_article request");

    $titre = $_POST['title'] ?? '';
    $categorie = $_POST['category'] ?? '';
    $description = $_POST['description'] ?? '';
    $prix_initial = isset($_POST['initialPrice']) ? floatval($_POST['initialPrice']) : 0;
    $prix_attendu = isset($_POST['desiredPrice']) ? floatval($_POST['desiredPrice']) : 0;
    $id_utilisateur = isset($_POST['id_utilisateur']) ? intval($_POST['id_utilisateur']) : 4;
    $status_article = isset($_POST['status_article']) ? $_POST['status_article'] : 'active';
    $photo_path = $_POST['image'] ?? ''; // Still uses 'image' as form field name

    error_log("Form data - titre: $titre, categorie: $categorie, description: $description, prix_initial: $prix_initial, prix_attendu: $prix_attendu, id_utilisateur: $id_utilisateur, status_article: $status_article, photo_path: '$photo_path'");

    if (!$titre || !$categorie || !$description || $prix_initial <= 0 || $prix_attendu <= 0 || !$photo_path) {
        $response['error'] = 'Tous les champs obligatoires doivent être remplis avec des valeurs valides.';
        error_log("Validation failed: " . $response['error']);
    } else {
        $date_debut = date('Y-m-d');
        $stmt = mysqli_prepare($connexion, "INSERT INTO article (titre, categorie, description, prix_initial, date_debut, photo, prix_attendu, status_article, id_utilisateur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if ($stmt) {
         
            mysqli_stmt_bind_param($stmt, "sssdsdssi", $titre, $categorie, $description, $prix_initial, $date_debut, $photo_value, $prix_attendu, $status_article, $id_utilisateur);
            if (mysqli_stmt_execute($stmt)) {
                $response['success'] = 'Article soumis avec succès.';
                error_log("Article inserted successfully, photo value stored: '$photo_value'");
            } else {
                $response['error'] = 'Erreur lors de l\'insertion dans la base de données : ' . mysqli_error($connexion);
                error_log("Database insertion failed: " . mysqli_error($connexion));
            }
            mysqli_stmt_close($stmt);
        } else {
            $response['error'] = 'Erreur de préparation de la requête : ' . mysqli_error($connexion);
            error_log("Statement preparation failed: " . mysqli_error($connexion));
        }
    }

    echo json_encode($response);
    exit;
}


// Endpoint to delete an article and its related auction data
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['action']) && $_GET['action'] === 'delete_article') {
    $id_article = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $id_utilisateur = 4; // Hardcoded for user 4, adjust as needed

    if ($id_article <= 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Invalid article ID"]);
        exit;
    }
    
    // First, find related enchere entries via est_sur
    $stmt = mysqli_prepare($connexion, "SELECT id_enchere FROM est_sur WHERE id_article = ?");
    mysqli_stmt_bind_param($stmt, "i", $id_article);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $enchere_ids = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $enchere_ids[] = $row['id_enchere'];
    }
    mysqli_stmt_close($stmt);

    // Delete from est_sur
    $stmt = mysqli_prepare($connexion, "DELETE FROM est_sur WHERE id_article = ?");
    mysqli_stmt_bind_param($stmt, "i", $id_article);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    // Delete from enchere for each related enchere ID
    foreach ($enchere_ids as $id_enchere) {
        $stmt = mysqli_prepare($connexion, "DELETE FROM enchere WHERE id_enchere = ?");
        mysqli_stmt_bind_param($stmt, "i", $id_enchere);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }

    // Finally, delete the article (only if it belongs to the user)
    $stmt = mysqli_prepare($connexion, "DELETE FROM article WHERE id_article = ? AND id_utilisateur = ?");
    mysqli_stmt_bind_param($stmt, "ii", $id_article, $id_utilisateur);
    $success = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    if ($success) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($connexion)]);
    }
    exit;
}

// Endpoint to delete an auction (enchere and est_sur only)
if ($_SERVER['REQUEST_METHOD'] === 'DELETE' && isset($_GET['action']) && $_GET['action'] === 'delete_auction') {
    $id_article = isset($_GET['id']) ? intval($_GET['id']) : 0;
    $id_utilisateur = 4; // Hardcoded for user 4, adjust as needed

    if ($id_article <= 0) {
        http_response_code(400);
        echo json_encode(["success" => false, "error" => "Invalid article ID"]);
        exit;
    }

    // Find related enchere entries via est_sur for the given article
    $stmt = mysqli_prepare($connexion, "SELECT e.id_enchere 
                                       FROM enchere e 
                                       JOIN est_sur es ON e.id_enchere = es.id_enchere 
                                       WHERE es.id_article = ? AND e.id_utilisateur = ?");
    mysqli_stmt_bind_param($stmt, "ii", $id_article, $id_utilisateur);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $enchere_ids = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $enchere_ids[] = $row['id_enchere'];
    }
    mysqli_stmt_close($stmt);

    if (empty($enchere_ids)) {
        http_response_code(404);
        echo json_encode(["success" => false, "error" => "No auction found for this article"]);
        exit;
    }

    // Delete from est_sur
    $stmt = mysqli_prepare($connexion, "DELETE FROM est_sur WHERE id_article = ?");
    mysqli_stmt_bind_param($stmt, "i", $id_article);
    $success = mysqli_stmt_execute($stmt);
    mysqli_stmt_close($stmt);

    if (!$success) {
        echo json_encode(["success" => false, "error" => mysqli_error($connexion)]);
        exit;
    }

    // Delete from enchere
    $success = true;
    foreach ($enchere_ids as $id_enchere) {
        $stmt = mysqli_prepare($connexion, "DELETE FROM enchere WHERE id_enchere = ?");
        mysqli_stmt_bind_param($stmt, "i", $id_enchere);
        $success = $success && mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
    }

    if ($success) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => mysqli_error($connexion)]);
    }
    exit;
}


mysqli_close($connexion);
echo json_encode($response);
?>