<?php
// Configurazione
$to = "info@decaonline.it"; // La tua email dove vuoi ricevere le richieste
$subject = "Nuova richiesta di contatto dal sito DE.CA.";

// Evitiamo accessi diretti al file
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    header("HTTP/1.1 403 Forbidden");
    echo "Accesso negato.";
    exit;
}

// Recupero dati e sanificazione
$name = strip_tags(trim($_POST["name"]));
$email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
$phone = strip_tags(trim($_POST["phone"]));
$message = strip_tags(trim($_POST["message"]));

// Honeypot (spam check)
if (!empty($_POST["_gotcha"])) {
    exit; // Se il bot ha compilato il campo nascosto, ci fermiamo
}

// Validazione minima
if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(["errors" => [["message" => "Dati non validi o incompleti."]]]);
    exit;
}

// Costruzione del corpo dell'email
$email_content = "Dettagli della richiesta:\n\n";
$email_content .= "Nome: $name\n";
$email_content .= "Email: $email\n";
$email_content .= "Telefono: $phone\n\n";
$email_content .= "Messaggio:\n$message\n";

// Header dell'email (fondamentali per Aruba)
$headers = "From: info@decaonline.it\r\n"; // Deve essere una mail del dominio decaonline.it
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=utf-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Invio
if (mail($to, $subject, $email_content, $headers)) {
    echo json_encode(["status" => "success"]);
} else {
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(["errors" => [["message" => "Errore nell'invio dell'email. Riprova più tardi."]]]);
}
?>
