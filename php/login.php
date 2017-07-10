<?php

	include('connect.php');

	$email = trim($_POST['email']);
	$password = hash('md5', trim($_POST['password']));

	include ('../config/database.php');
	$stmt = $db->prepare('SELECT `password`, `activated`, `user_name` FROM `users` WHERE `email` = :email');
	$stmt->execute(['email' => $email]);
	$row = $stmt->fetch(PDO::FETCH_LAZY);
	if (!(isset($row['password'])) || !hash_equals($row['password'], $password) || $row['activated'] == 0) {
		echo (json_encode(["status" => 200, "user" => "not found"]));
	} else {
		$_SESSION['user_email'] = base64_encode($email);
		$_SESSION['profile_name'] = $row['user_name'];
		echo (json_encode(["status" => 200, "user" => "found"]));
	}
?>
