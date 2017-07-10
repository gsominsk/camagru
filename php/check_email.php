
<?php
	include('connect.php');

	$email = trim($_POST['email']);

	include ('../config/database.php');
	$stmt = $db->prepare('SELECT `email`,`user_key` FROM `users` WHERE `email` = :email');
	$stmt->execute(['email' => $email]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);
	if (!(isset($row['email'])) || empty($row['email'])) {
		echo (json_encode(["status" => 200, "user" => "not found"]));
	} else {
		$to = $email;
		$subject = "New User Validation";
		$from = 'info@localhost:8080';
		$body = '<br>YOUR KEY '.$row['user_key'].' <br/>';
		$headers = "From: " . strip_tags($from) . "\r\n";
		$headers .= "Reply-To: ". strip_tags($from) . "\r\n";
		$headers .= "MIME-Version: 1.0\r\n";
		$headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
		$check = mail($to, $subject, $body, $headers);
		echo (json_encode(["status" => 200, "user" => "found"]));
	}
?>
