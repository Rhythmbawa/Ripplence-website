<?php
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    exit;
}

$name    = trim($_POST["name"] ?? '');
$email   = trim($_POST["email"] ?? '');
$message = trim($_POST["message"] ?? '');

if ($name === '' || $email === '' || $message === '') {
    echo "INVALID";
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo "INVALID_EMAIL";
    exit;
}

$to = "hello@ripplence.com"; // change to your real email
$subject = "New Contact Request - XYZ";

$body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
$headers = "From: $email\r\nReply-To: $email";

if (mail($to, $subject, $body, $headers)) {
    echo "SUCCESS";
} else {
    echo "FAILED";
}
