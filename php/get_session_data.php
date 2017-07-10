<?php
	include('connect.php');

	include ('../config/database.php');
	// var_dump($_SESSION['user_email']);
	if (!empty($_SESSION['user_email'])) {
		$email = $_SESSION['user_email'];
		$stmt = $db->prepare('SELECT `user_key`, `user_name` FROM `users` WHERE `email` = :email');
		$stmt->execute(['email' => base64_decode($email)]);
		$row = $stmt->fetch(PDO::FETCH_LAZY);
		$result = (object) array('user_key' => $row['user_key'], 'user_name' => $row['user_name']);
		$_SESSION['user_key'] = $row['user_key'];
		// var_dump($result);
		if ($row['user_key'] != NULL)
			echo (json_encode(["status" => 200, "userData" => $result]));
		else
			echo (json_encode(["status" => 200, "userData" => "not found"]));
	} else {
		echo (json_encode(["status" => 200, "userData" => "not found"]));
	}
?>
